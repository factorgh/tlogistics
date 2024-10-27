import { SearchOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Input, Modal, Space, Table } from "antd";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  useDeleteVendorMutation,
  useGetVendorsQuery,
  useUpdateVendorMutation,
} from "../../app/services/vendors/vendors";

const VendorListTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [currentRecord, setCurrentRecord] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const searchInput = useRef(null);
  const { data, isFetching, isError } = useGetVendorsQuery();
  const [deleteVendor] = useDeleteVendorMutation();
  const [updateVendor] = useUpdateVendorMutation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (currentRecord) {
      form.setFieldsValue(currentRecord); // Set form fields when currentRecord changes
    } else {
      form.resetFields(); // Clear form when there's no current record
    }
  }, [currentRecord, form]);

  const handleDelete = async (userId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this vendor?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteVendor({ id: userId }).unwrap();
        toast.success("Vendor deleted successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete vendor");
      }
    }
  };

  const handleSubmit = async () => {
    console.log(currentRecord.id);
    try {
      const values = await form.validateFields();
      await updateVendor({ id: currentRecord.id, vendorData: { ...values } });
      setCurrentRecord(null); // Clear current record after update
      setIsModalVisible(false);
      toast.success("Vendor updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update vendor");
    }
  };

  const handleEdit = (record) => {
    setCurrentRecord(record);
    setIsModalVisible(true);
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

  if (isError) {
    toast.error("Failed to load vendors");
  }

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
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 150,
      ...getColumnSearchProps("email"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 100,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 200,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      width: 100,
      render: (_, record) => (
        <div className="flex gap-5">
          <a>
            <IoMdTrash color="red" onClick={() => handleDelete(record.id)} />
          </a>
          <a onClick={() => handleEdit(record)}>
            <MdEdit />
          </a>
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        loading={isFetching}
        dataSource={data?.vendors}
        columns={columns}
        rowKey={(record) => record.id}
      />

      <Modal
        title="Edit Vendor"
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={() => {
          setIsModalVisible(false);
          setCurrentRecord(null); // Reset current record on cancel
        }}
      >
        <Form layout="vertical" form={form}>
          <Divider />
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              { required: true, message: "Please enter your phone number" },
            ]}
          >
            <Input placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input placeholder="Enter Address" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default VendorListTable;
