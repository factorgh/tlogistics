import { Button, DatePicker, Divider, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import PetrolTable from "../../components/fuel-station/petrol-table";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const Petrol = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editRecord, setEditRecord] = useState(null);

  // Sample data source
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

  const handleSubmit = (values) => {
    const amount = values.consumption * values.unitPrice; // Calculate amount
    const newRecord = {
      key: isEditing ? editRecord.key : dataSource.length + 1, // Assign a unique key
      vehicleNo: values.vehicleNo,
      date: values.date.format("YYYY-MM-DD"), // Format date for display
      consumption: values.consumption,
      unitPrice: values.unitPrice,
      amount: amount.toFixed(2), // Keep two decimal places
      pump: values.pump, // Include pump in the record
      company: values.company, // Include company in the record
      phoneNumber: values.phoneNumber, // Include phone number in the record
      status: "Active", // Default status
    };

    if (isEditing) {
      // Update logic
      setDataSource(
        dataSource.map((item) =>
          item.key === editRecord.key ? newRecord : item
        )
      );
    } else {
      // Create logic
      setDataSource([...dataSource, newRecord]);
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
    form.setFieldsValue(record); // Populate form with record data
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <CustomLayout>
      <div className="flex items-center justify-between">
        <div>
          <CustomHeader headerTitle={"Petrol"} />
        </div>

        <div className="flex gap-3">
          <Button type="primary" className="bg-green-500 text-white ml-3">
            Monthly Report
          </Button>
          <Button type="primary" onClick={handleAdd}>
            Add Entry
          </Button>
        </div>

        <Modal
          title={isEditing ? "Update Entry" : "Add Entry"}
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form onFinish={handleSubmit} layout="vertical" form={form}>
            <div className="grid grid-cols-2 gap-3">
              <Form.Item
                label="Vehicle No."
                name="vehicleNo"
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
                name="unitPrice"
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
                <Select defaultValue="pump1">
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
            <Button className="w-full" type="primary" htmlType="submit">
              {isEditing ? "Update Entry" : "Add Entry"}
            </Button>
          </Form>
        </Modal>
      </div>
      <PetrolTable dataSource={dataSource} handleEdit={handleEdit} />
    </CustomLayout>
  );
};

export default Petrol;
