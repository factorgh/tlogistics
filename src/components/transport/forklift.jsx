import { SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Spin,
  Table,
} from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  useDeleteForkliftMutation,
  useGetForkliftsQuery,
  useUpdateForkliftMutation,
} from "../../app/services/transport/forklift";

/*************  ✨ Codeium Command ⭐  *************/
/******  73149548-4962-46cc-8130-d89b087b253e  *******/ const ForkliftTable =
  () => {
    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");
    const searchInput = useRef(null);
    const { data, isFetching } = useGetForkliftsQuery();
    console.log(data);
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editTransportData, setEditTrasnportData] = useState(null);
    const [editTransportId, setEditTransportId] = useState(null);

    const [updateTransport, { isLoading, error }] = useUpdateForkliftMutation();
    const [deleteTransport] = useDeleteForkliftMutation();

    const showEditModal = (transport) => {
      console.log(transport);
      setEditTrasnportData(transport);
      setEditTransportId(transport.id);
      form.setFieldsValue({
        energy_type: transport.energy_type,
        tonnage: transport.tonnage,
        type: transport.type,
      });

      setIsModalVisible(true);
    };

    const handleSubmit = async (values) => {
      console.log(values);

      try {
        const response = await updateTransport({
          id: editTransportId,
          forkliftData: values,
        });
        console.log(response);
        form.resetFields();
        setIsModalVisible(false);
        toast.success("Transport Forklift Updated Successfully");
      } catch (err) {
        console.log(err);
        toast.error(error?.data?.message);
      }

      console.log("Form Values:", values);
    };

    const handleDelete = async (id) => {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this transport?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        try {
          await deleteTransport(id).unwrap();
          toast.success("Transport Forklift deleted successfully");
        } catch (error) {
          console.error(error);
          toast.error("Failed to delete  transport");
        }
      }
    };

    const handleCancel = () => {
      setIsModalVisible(false);
      setEditTrasnportData(null);
    };
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText("");
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
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase()),
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
        title: "Energy Type",
        dataIndex: "energy_type",
        key: "energy_type",
        width: 100,
        ...getColumnSearchProps("energy type"),
      },
      {
        title: "Tonage",
        dataIndex: "tonnage",
        key: "tonnage",
        width: 100,
        ...getColumnSearchProps("tonage"),
      },
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        width: 100,
        ...getColumnSearchProps("type"),
      },

      {
        title: "Action",
        dataIndex: "",
        key: "action",
        width: 100,
        render: (_, record) => (
          <div className="flex gap-3">
            {/* <IoMdEyeOff /> */}

            <MdEdit onClick={() => showEditModal(record)} />
            <IoMdTrash color="red" onClick={() => handleDelete(record?.id)} />
          </div>
        ),
      },
      // Add more columns as needed
    ];

    return (
      <>
        <Table
          loading={isFetching}
          columns={columns}
          dataSource={data?.forklifts}
          scroll={{ x: 1000 }} // Enable horizontal scrolling
          className="border border-slate-200 rounded-md"
        />
        <Modal
          title="Edit Forklift"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          {editTransportData && (
            <div>
              <Form onFinish={handleSubmit} layout="vertical" form={form}>
                <Divider />
                <div className="grid grid-cols-1 gap-2">
                  <Form.Item
                    label="Energy Type"
                    name="energy_type" // Changed from "energy type" to "energy_type"
                    rules={[
                      { required: true, message: "Please select energy type" },
                    ]} // Added validation rule
                  >
                    <Select>
                      <Select.Option value="gas">Gas</Select.Option>
                      <Select.Option value="diesel">Diesel</Select.Option>
                      <Select.Option value="electrical">
                        Electrical
                      </Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Tonnage"
                    name="tonnage"
                    rules={[
                      { required: true, message: "Please enter tonnage" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Type"
                    name="type"
                    rules={[
                      { required: true, message: "Please select a type" },
                    ]}
                  >
                    <Select>
                      <Select.Option value="heli">Heli</Select.Option>
                      <Select.Option value="jac">Jac</Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div style={{ textAlign: "right" }}>
                  {isLoading ? (
                    <Button className="w-full mt-3" htmlType="submit">
                      <Spin />
                    </Button>
                  ) : (
                    <Button
                      className="w-full mt-3"
                      type="primary"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </Form>
            </div>
          )}
        </Modal>
      </>
    );
  };

export default ForkliftTable;
