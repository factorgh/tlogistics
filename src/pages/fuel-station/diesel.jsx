import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Spin,
} from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateFuelStationMutation,
  useGetDieselStationsQuery,
} from "../../app/services/fuel-station/fuel-station";
import DieselTable from "../../components/fuel-station/diesel-table";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";
import ExportDailyExcel from "../../utils/excel-daily-downloader";

const Diesel = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [createDiesel, { isLoading }] = useCreateFuelStationMutation();
  const { data } = useGetDieselStationsQuery();
  console.log(data);

  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      vehicleNo: "ABC 123",
      date: "2024-10-01",
      consumption: 50,
      unitPrice: 10,
      amount: "500.00",
      pump: "pump1",
      company: "Company A",
      phoneNumber: "1234567890",
      status: "Active",
    },
    {
      key: 2,
      vehicleNo: "XYZ 456",
      date: "2024-10-05",
      consumption: 30,
      unitPrice: 10,
      amount: "300.00",
      pump: "pump2",
      company: "Company B",
      phoneNumber: "0987654321",
      status: "Active",
    },
    {
      key: 3,
      vehicleNo: "LMN 789",
      date: "2024-10-10",
      consumption: 45,
      unitPrice: 10,
      amount: "450.00",
      pump: "pump1",
      company: "Company C",
      phoneNumber: "1122334455",
      status: "Inactive",
    },
  ]);

  // Handle form submission
  const handleSubmit = async (values) => {
    const amount = values.consumption * values.unitPrice; // Calculate amount
    const newRecord = {
      // key: isEditing ? editRecord.key : dataSource.length + 1, // Assign a unique key
      vehicle_number: values.vehicleNo,
      date: values.date.format("YYYY-MM-DD"), // Format date for display
      consumption: values.consumption,
      unit_price: values.unitPrice,
      amount: amount.toFixed(2),
      pump: values.pump,
      company: values.company,
      phone: values.phoneNumber,
      status: "Active",
      type: "DIESEL",
    };

    if (isEditing) {
      // Update logic
      setDataSource(
        dataSource.map((item) =>
          item.key === editRecord.key ? newRecord : item
        )
      );
    } else {
      // Create petrol entity
      try {
        await createDiesel(newRecord);
        console.log(newRecord); // Create logic
        toast.success("Diesel entry created successfully");
        // setDataSource([...dataSource, newRecord]);
      } catch (error) {
        toast.error(error?.data?.message);
      }
    }

    // Close modal and reset form
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleAdd = () => {
    setIsEditing(false);
    setEditRecord(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setIsEditing(true);
    setEditRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <CustomLayout>
      <div className="flex items-center justify-between">
        <CustomHeader headerTitle={"Diesel"} />
        <div className="flex gap-3">
          <Button type="primary" onClick={handleAdd}>
            Add Entry
          </Button>
          <ExportDailyExcel data={data?.stations}>
            <h3>Daily Report</h3>
          </ExportDailyExcel>
        </div>
      </div>

      {/* Modal for Create/Update form */}
      <Modal
        title={isEditing ? "Update Entry" : "Add Entry"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form onFinish={handleSubmit} layout="vertical" form={form}>
          <div className="grid grid-cols-2 gap-3">
            <Form.Item label="Vehicle No." name="vehicleNo">
              <Input />
            </Form.Item>
            <Form.Item label="Consumption (Lts)" name="consumption">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Unit Price" name="unitPrice">
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Amount" name="amount">
              <Input type="number" disabled />
            </Form.Item>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Form.Item label="Date" name="date">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Select" name="pump">
              <Select placeholder="Select pump">
                <Select.Option value="pump1">Pump 1</Select.Option>
                <Select.Option value="pump2">Pump 2</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Company" name="company">
              <Input placeholder="Enter your company" />
            </Form.Item>
            <Form.Item label="Phone Number" name="phoneNumber">
              <Input placeholder="Enter your phone number" />
            </Form.Item>
          </div>
          <Divider />
          {isLoading ? (
            <Button className="w-full" htmlType="submit">
              <Spin />
            </Button>
          ) : (
            <Button className="w-full" type="primary" htmlType="submit">
              {isEditing ? "Update Entry" : "Add Entry"}
            </Button>
          )}
        </Form>
      </Modal>
      <DieselTable dataSource={dataSource} handleEdit={handleEdit} />
    </CustomLayout>
  );
};

export default Diesel;
