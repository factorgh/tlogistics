import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  Table,
} from "antd";
import moment from "moment";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  useDeleteFuelStationMutation,
  useGetGasStationsQuery,
  useUpdateFuelStationMutation,
} from "../../app/services/fuel-station/fuel-station";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const GasTable = () => {
  const { data, isFetching } = useGetGasStationsQuery();

  // state
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editTransportData, setEditTrasnportData] = useState(null);
  const [editTransportId, setEditTransportId] = useState(null);
  const [updateFuelStation, { isLoading, error }] =
    useUpdateFuelStationMutation();
  const [deleteFuelStation] = useDeleteFuelStationMutation();

  // Edit modal
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditTrasnportData(null);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this gas activity?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteFuelStation(id).unwrap();
        toast.success("Gas Activity deleted successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete gas: " + error.message);
      }
    }
  };
  const showEditModal = (fuel_station) => {
    console.log(fuel_station);
    setEditTrasnportData(fuel_station);
    setEditTransportId(fuel_station.id);
    form.setFieldsValue({
      vehicle_number: fuel_station.vehicle_number,
      consumption: fuel_station.consumption,
      unit_price: fuel_station.unit_price,
      date: fuel_station.date ? moment(fuel_station.date) : null,
      pump: fuel_station.pump,
      company: fuel_station.company,
      phone: fuel_station.phone,
      entity: fuel_station.entity,
    });

    setIsModalVisible(true);
  };

  const handleSubmit = async (values) => {
    console.log(values);

    try {
      const response = await updateFuelStation({
        id: editTransportId,
        fuelData: values,
      });
      console.log(response);
      form.resetFields();
      setIsModalVisible(false);
      toast.success("Gas Activity Updated Successfully");
    } catch (err) {
      console.log(err);
      toast.error(error?.data?.message);
    }

    console.log("Form Values:", values);
  };

  const columns = [
    {
      title: "Vehicle No.",
      dataIndex: "vehicle_number",
      key: "vehicle_number",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => {
        return moment(text).format("YYYY-MM-DD");
      },
    },
    {
      title: "Consumption (Lts)",
      dataIndex: "consumption",
      key: "consumption",
    },
    {
      title: "Unit Price",
      dataIndex: "unit_price",
      key: "unit_price",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Pump",
      dataIndex: "pump",
      key: "pump",
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Entity",
      dataIndex: "entity",
      key: "entity",
      render: (entity) => {
        switch (entity) {
          case "FOLK_LIFT":
            return "Forklift";
          case "FACTORY_AND_HOUSES":
            return "Factory & Houses";
          default:
            return entity;
        }
      },
    },
    {
      title: "Action",
      key: "action",
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
        dataSource={data?.stations}
        columns={columns}
      />
      <Modal
        title="Edit Beverage Transport"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {editTransportData && (
          <div>
            <Form onFinish={handleSubmit} layout="vertical" form={form}>
              <div className="grid grid-cols-2 gap-3">
                <Form.Item
                  label="Vehicle No."
                  name="vehicle_number"
                  rules={[
                    { required: true, message: "Please input vehicle number!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Consumption (Lts)"
                  name="consumption"
                  rules={[
                    { required: true, message: "Please input consumption!" },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item
                  label="Unit Price"
                  name="unit_price"
                  rules={[
                    { required: true, message: "Please input unit price!" },
                  ]}
                >
                  <Input type="number" />
                </Form.Item>
                <Form.Item label="Amount" name="amount">
                  <Input type="number" disabled />
                </Form.Item>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Form.Item
                  label="Date"
                  name="date"
                  rules={[{ required: true, message: "Please select a date!" }]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Select Pump" name="pump">
                  <Select placeholder="Select pump">
                    <Select.Option value="pump1">Pump 1</Select.Option>
                    <Select.Option value="pump2">Pump 2</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Company" name="company">
                  <Input placeholder="Enter your company" />
                </Form.Item>
                <Form.Item label="Phone Number" name="phone">
                  <Input placeholder="Enter your phone number" />
                </Form.Item>
                <Form.Item label="Entity" name="entity">
                  <Select defaultValue="forklift">
                    <Select.Option value="FOLK_LIFT">Forklift</Select.Option>
                    <Select.Option value="FACTORY_AND_HOUSES">
                      Factory & Houses
                    </Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <Divider />
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
            </Form>
          </div>
        )}
      </Modal>
    </>
  );
};

export default GasTable;
