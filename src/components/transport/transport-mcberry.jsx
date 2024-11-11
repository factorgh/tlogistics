import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
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
import TextArea from "antd/es/input/TextArea";

import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  useDeleteTransportMutation,
  useGetMcBerryTransportsQuery,
  useUpdateTransportMutation,
} from "../../app/services/transport/transport";

const TransportMcBerryTable = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const { data: mcberryTransports, isFetching } =
    useGetMcBerryTransportsQuery();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editTransportData, setEditTrasnportData] = useState(null);
  const [editTransportId, setEditTransportId] = useState(null);

  const [updateTransport, { isLoading, error }] = useUpdateTransportMutation();
  const [deleteTransport] = useDeleteTransportMutation();

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditTrasnportData(null);
  };

  const showEditModal = (transport) => {
    console.log(transport);
    setEditTrasnportData(transport);
    setEditTransportId(transport.id);
    form.setFieldsValue({
      vehicle_number: transport.vehicle_number,
      driver_management: transport.driver_management,
      vehicle_type: transport.vehicle_type,
      truck_assistant: transport.truck_assistant,
      registration_expiring_date: transport.registration_expiring_date,
      insurance_expiring_date: transport.insurance_expiring_date,
      route_optimization: transport.route_optimization,
    });

    setIsModalVisible(true);
  };

  // HANDLE UPDATE SUBMISSION
  const handleSubmit = async (values) => {
    console.log(values);

    try {
      const response = await updateTransport({
        id: editTransportId,
        transportData: values,
      });
      console.log(response);
      form.resetFields();
      setIsModalVisible(false);
      toast.success("Transport Beverage Updated Successfully");
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
        toast.success("Transport mcberry deleted successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete transport mcberry");
      }
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
      title: "Vehicle No.",
      dataIndex: "vehicle_number",
      key: "vehicle_number",
      width: 100,
      ...getColumnSearchProps("vehicle_number"),
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicle_type",
      key: "vehicle_type",
      width: 100,
      ...getColumnSearchProps("vehicle_type"),
    },
    {
      title: "Route optimization",
      dataIndex: "route_optimization",
      key: "route_optimization",
      width: 100,
      ...getColumnSearchProps("route_optimization"),
    },
    {
      title: "Insurance Exp.",
      dataIndex: "insurance_expiring_date",
      key: "insurance_expiring_date",
      width: 100,
      ...getColumnSearchProps("insurance_expiring_date"),
    },
    {
      title: "Registration Exp",
      dataIndex: "registration_expiring_date",
      key: "registration_expiring_date",
      width: 100,
      ...getColumnSearchProps("registration_expiring_date"),
    },
    {
      title: "Driver",
      dataIndex: "driver_management",
      key: "driver_management",
      width: 100,
      ...getColumnSearchProps("driver_management"),
    },

    {
      title: "truck_assistant Ass.",
      dataIndex: "truck_assistant",
      key: "truck_assistant",
      width: 200,
      ...getColumnSearchProps("truck_assistant"),
    },

    {
      title: "Action",
      dataIndex: "",
      key: "action",
      width: 100,
      render: (_, record) => (
        <div className="flex gap-3">
          {/* <IoMdEyeOff /> */}

          <EditOutlined
            className="text-blue-500 hover:text-blue-700"
            onClick={() => showEditModal(record)}
          />
          <DeleteOutlined
            className="text-red-500 hover:text-red-700"
            color="red"
            onClick={() => handleDelete(record?.id)}
          />
        </div>
      ),
    },
  ];
  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={mcberryTransports?.transports}
        scroll={{ x: 1000 }}
        className="border border-slate-200 rounded-md"
      />
      <Modal
        title="Edit Beverage Transport"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {editTransportData && (
          <div>
            <Form onFinish={handleSubmit} layout={"vertical"} form={form}>
              <div>
                <Divider />
                <div className="grid grid-cols-2 gap-3">
                  <Form.Item label="Vehicle Number" name={"vehicle_number"}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Vehicle Type" name={"vehicle_type"}>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Driver Management"
                    name={"driver_management"}
                  >
                    <Select>
                      <Select.Option value="demo">Demo</Select.Option>
                      {/* Add more options as needed */}
                    </Select>
                  </Form.Item>

                  <Form.Item label="Truck Assistant" name={"truck_assistant"}>
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Registration Exp. Date"
                    name={"registration_expiring_date"}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Insurance Exp. Date"
                    name={"insurance_expiring_date"}
                  >
                    <Input />
                  </Form.Item>
                </div>
                <h5>Route Optimization</h5>
                <Form.Item name="route_optimization" noStyle>
                  <TextArea rows={4} />
                </Form.Item>
              </div>

              <div>
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

export default TransportMcBerryTable;
