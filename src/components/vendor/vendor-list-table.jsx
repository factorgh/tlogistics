import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  Modal,
  Space,
  Table,
  Upload,
} from "antd";
import { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import * as XLSX from "xlsx"; // Import xlsx library
import {
  useBulkAddVendorsMutation,
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
  const [bulkAddVendors] = useBulkAddVendorsMutation();
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
    try {
      const values = await form.validateFields();
      await updateVendor({ id: currentRecord.id, vendorData: { ...values } });
      setCurrentRecord(null);
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

  // Function to handle Excel file upload and parse it
  const handleFileUpload = async (file) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet);

      // Assuming each row has "name", "email", "phone", and "address" columns
      try {
        await bulkAddVendors(parsedData).unwrap(); // Assuming API call
        toast.success("Vendors uploaded successfully");
      } catch (error) {
        console.error("Error uploading vendors:", error);
        toast.error("Failed to upload vendors");
      }
    };
    reader.readAsArrayBuffer(file);
    return false; // Prevent automatic upload by antd
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
          <a onClick={() => handleEdit(record)}>
            <EditOutlined className="text-blue-500 hover:text-blue-700" />
          </a>
          <a>
            <DeleteOutlined
              color="red"
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(record.id)}
            />
          </a>
        </div>
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <Upload
          beforeUpload={handleFileUpload}
          accept=".xlsx, .xls"
          showUploadList={false}
        >
          <Button icon={<UploadOutlined />}>Bulk Upload Vendors</Button>
        </Upload>
      </Space>

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
