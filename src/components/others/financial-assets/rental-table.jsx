import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Space, Spin, Table } from "antd";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  useDeleteRentalMutation,
  useGetRentalsQuery,
  useUpdateRentalMutation,
} from "../../../app/services/rental/rental";

const RentalTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { data: rentalData, isLoading: rentalIsLoading } = useGetRentalsQuery();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editRentalId, setEditRentalId] = useState(null); // Rental ID to identify which rental is being edited
  const [isEditMode, setIsEditMode] = useState(false); // To determine if we're in edit mode
  const [form] = Form.useForm();

  const [updateRental, { isLoading }] = useUpdateRentalMutation();
  const [deleteRental] = useDeleteRentalMutation();

  // const showModal = () => {
  //   setIsModalVisible(true);
  //   setIsEditMode(false); // Reset to "Add" mode when opening modal
  // };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditRentalId(null); // Reset the edit ID
    setIsEditMode(false); // Ensure we are in "Add" mode on cancel
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

  const showEditModal = (rental) => {
    setIsEditMode(true);
    setEditRentalId(rental.id); // Set the rental ID for editing
    form.setFieldsValue({
      agent_name: rental.agent_name,
      leasing: rental.leasing,
      vehicle_type: rental.vehicle_type,
      driver_name: rental.driver_name,
    });
    setIsModalVisible(true);
  };

  // Handle submit (either update or create a new rental)
  const handleFormSubmit = async (values) => {
    try {
      if (isEditMode) {
        // Update rental entry
        await updateRental({
          id: editRentalId, // Use the editRentalId to update the correct entry
          ...values,
        }).unwrap();
        toast.success("Rental Updated Successfully");
      } else {
        // Create a new rental entry
        // Assuming createRental is a function you have defined elsewhere (or an API call)

        toast.success("Rental Created Successfully");
      }

      setIsModalVisible(false); // Close modal after submission
      form.resetFields(); // Reset form fields
    } catch (error) {
      toast.error("Failed to save rental entry: " + (error?.message || ""));
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this rental?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await deleteRental(id).unwrap();
        toast.success("Rental deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete rental: " + error?.message);
    }
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
      title: "Agent Name",
      dataIndex: "agent_name",
      key: "agent_name",
      width: 150,
      ...getColumnSearchProps("agent_name"),
    },
    {
      title: "Leasing Options",
      dataIndex: "leasing",
      key: "leasing",
      width: 150,
      ...getColumnSearchProps("leasing"),
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicle_type",
      key: "vehicle_type",
      width: 150,
      ...getColumnSearchProps("vehicle_type"),
    },
    {
      title: "Driver Name",
      dataIndex: "driver_name",
      key: "driver_name",
      width: 150,
      ...getColumnSearchProps("driver_name"),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "action",
      width: 100,
      render: (_, record) => (
        <div className="flex gap-3">
          <MdEdit onClick={() => showEditModal(record)} />
          <IoMdTrash color="red" onClick={() => handleDelete(record?.id)} />
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        loading={rentalIsLoading}
        pagination={true}
        columns={columns}
        dataSource={rentalData?.vehicleRental}
        scroll={{ x: 1000 }}
        className="border border-slate-200 rounded-md"
        rowKey="agentName"
      />
      <Modal
        title={isEditMode ? "Edit Rental Vehicle" : "Add Rental Vehicle"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          {/* Agent Name */}
          <Form.Item
            label="Agent Name"
            name="agent_name"
            rules={[
              { required: true, message: "Please enter the agent's name" },
            ]}
          >
            <Input placeholder="Enter agent name" />
          </Form.Item>

          {/* Leasing Options */}
          <Form.Item
            label="Leasing Options"
            name="leasing"
            rules={[
              { required: true, message: "Please select a leasing option" },
            ]}
          >
            <Select placeholder="Select leasing option">
              <Select.Option value="shortTerm">Short Term</Select.Option>
              <Select.Option value="longTerm">Long Term</Select.Option>
              <Select.Option value="daily">Daily</Select.Option>
            </Select>
          </Form.Item>

          {/* Vehicle Type */}
          <Form.Item
            label="Vehicle Type"
            name="vehicle_type"
            rules={[
              { required: true, message: "Please select the vehicle type" },
            ]}
          >
            <Select placeholder="Select vehicle type">
              <Select.Option value="truck">Truck</Select.Option>
              <Select.Option value="salonCar">Salon Car</Select.Option>
              <Select.Option value="van">Van</Select.Option>
              <Select.Option value="motorcycle">Motorcycle</Select.Option>
            </Select>
          </Form.Item>

          {/* Driver Name */}
          <Form.Item
            label="Driver Name"
            name="driver_name"
            rules={[
              { required: true, message: "Please enter the driver's name" },
            ]}
          >
            <Input placeholder="Enter driver name" />
          </Form.Item>

          <Form.Item>
            {isLoading ? (
              <Button className="w-full" htmlType="submit" disabled>
                <Spin />
              </Button>
            ) : (
              <Button className="w-full" type="primary" htmlType="submit">
                Submit
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default RentalTable;
