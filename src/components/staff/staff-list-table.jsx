import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
} from "antd";
import moment from "moment";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { IoMdEyeOff, IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  useDeleteStaffMutation,
  useGetStaffsQuery,
  useUpdateStaffMutation,
} from "../../app/services/staff/staff";

const StaffListTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { data, isFetching } = useGetStaffsQuery();
  const [deleteStaff] = useDeleteStaffMutation();
  const [updateStaff, { isLoading, error }] = useUpdateStaffMutation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editStaffData, setEditStaffData] = useState(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this customer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteStaff(id).unwrap();
        toast.success("Staff deleted successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete staff");
      }
    }
  };

  const handleSubmit = async (values) => {
    console.log(values);
    const formattedValues = {
      ...values,
      start_date: values.start_date.$d,
    };
    // Send data to endpoint
    try {
      const response = await updateStaff(formattedValues);
      console.log(response);
      form.resetFields();
      setIsModalVisible(false);
      toast.success("Staff Created Successfully");
    } catch (err) {
      console.log(err);
      toast.error(error?.data?.message);
    }

    console.log("Form Values:", formattedValues);
  };

  const showEditModal = (staff) => {
    console.log(staff);
    setEditStaffData(staff);
    form.setFieldsValue({
      name: staff.name,
      position: staff.position,
      start_date: staff.start_date ? moment(staff.start_date) : null, // Assuming start_date is in a suitable format
      username: staff.username,
      emergency_name: staff.emergency_name,
      emergency_number: staff.emergency_number,
      email: staff.email,
      id_card_number: staff.id_card_number,
      id_card_type: staff.id_card_type,
      phone: staff.phone,
      employee_address: staff.employee_address,
      status: staff.status,
    });
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Handle the save action here (e.g., update staff)
    setIsModalVisible(false);
    setEditStaffData(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditStaffData(null);
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button type="link" size="small" onClick={() => close()}>
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      width: 150,
      ...getColumnSearchProps("role"),
    },

    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 150,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
      ...getColumnSearchProps("email"),
    },

    {
      title: "Action",
      dataIndex: "",
      key: "action",
      width: 100,
      render: (_, record) => (
        <div className="flex gap-3">
          <IoMdEyeOff
            onClick={() =>
              navigate("/main/staff-detail", { state: { staffId: record.id } })
            }
          />
          <MdEdit onClick={() => showEditModal(record)} />
          <IoMdTrash color="red" onClick={() => handleDelete(record?.id)} />
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        pagination={{ defaultPageSize: 8, showSizeChanger: false }}
        loading={isFetching}
        columns={columns}
        dataSource={data?.users}
        scroll={{ x: 1000 }}
        className="border border-slate-200 rounded-md"
      />
      <Modal
        title="Edit Staff"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Edit"
        cancelText="Close"
        cancelButtonProps={{
          style: { backgroundColor: "#858796", color: "white" },
        }}
        confirmLoading={isLoading}
      >
        {editStaffData && (
          <div>
            <Form onFinish={handleSubmit} layout={"vertical"} form={form}>
              <div>
                <Divider />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[
                        { required: true, message: "Please enter your name" },
                      ]}
                    >
                      <Input placeholder="Enter your name" />
                    </Form.Item>
                    <Form.Item label="Select Position" name="position">
                      <Select defaultValue="admin">
                        <Select.Option value="admin">Admin</Select.Option>
                        <Select.Option value="employee">Employee</Select.Option>
                        <Select.Option value="transport">
                          Transport Manager
                        </Select.Option>
                        <Select.Option value="warehouse">
                          Warehouse Manager
                        </Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Starting Date"
                      name="start_date"
                      rules={[
                        { required: true, message: "Please select a date" },
                      ]}
                    >
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      label="Username"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your username",
                        },
                      ]}
                    >
                      <Input placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                      label="Emergency Name"
                      name="emergency_name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your emergency name",
                        },
                      ]}
                    >
                      <Input placeholder="Emergency Name" />
                    </Form.Item>
                    <Form.Item
                      label="Emergency Number"
                      name="emergency_number"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your emergency number",
                        },
                      ]}
                    >
                      <Input placeholder="Emergency number" />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: "Please enter your email" },
                      ]}
                    >
                      <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                      label="ID Card Number"
                      name="id_card_number"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your ID card number",
                        },
                      ]}
                    >
                      <Input placeholder="ID Card Number" />
                    </Form.Item>
                    <Form.Item
                      label="ID Card Type"
                      name="id_card_type"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your ID card type",
                        },
                      ]}
                    >
                      <Input placeholder="ID Card Type" />
                    </Form.Item>
                    <Form.Item
                      label="Phone Number"
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your phone number",
                        },
                      ]}
                    >
                      <Input placeholder="Phone Number" />
                    </Form.Item>
                    <Form.Item
                      label="Employee Address"
                      name="employee_address"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your address",
                        },
                      ]}
                    >
                      <Input placeholder="Employee Address" />
                    </Form.Item>
                    <Form.Item
                      label="Status"
                      name="status"
                      rules={[
                        { required: true, message: "Please enter your status" },
                      ]}
                    >
                      <Input placeholder="Status" />
                    </Form.Item>
                  </div>
                </div>
              </div>
              {/* {isLoading && (
                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <Spin />
                </div>
              )} */}
            </Form>
          </div>
        )}
      </Modal>
    </>
  );
};

export default StaffListTable;
