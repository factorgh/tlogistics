import { Button, DatePicker, Divider, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import DieselTable from "../../components/fuel-station/diesel-table";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const Diesel = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editRecord, setEditRecord] = useState(null);

  // Handle form submission
  const handleSubmit = (values) => {
    if (isEditing) {
      // Update logic here
      console.log("Updating entry:", values);
    } else {
      // Create logic here
      console.log("Creating new entry:", values);
    }
    // Close modal and reset form
    setIsModalVisible(false);
    form.resetFields();
  };

  // Open modal for new entry
  const handleAdd = () => {
    setIsEditing(false);
    setEditRecord(null);
    setIsModalVisible(true);
  };

  // Open modal for editing an entry
  const handleEdit = (record) => {
    setIsEditing(true);
    setEditRecord(record);
    form.setFieldsValue(record); // Populate form with record data
    setIsModalVisible(true);
  };

  // Modal cancel button
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <CustomLayout>
      <div className="flex items-center justify-between">
        <CustomHeader headerTitle={"Diesel"} />
        <div>
          <h3 className="text-sm mb-3">
            Stock In Hand: <span className="text-blue-500">120,000 LTS</span>
            <Button type="primary" className="bg-green-500 text-white ml-3">
              Monthly Report
            </Button>
          </h3>
        </div>
      </div>

      {/* Add/Edit Button */}
      <Button type="primary" onClick={handleAdd}>
        Add Entry
      </Button>

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
          <Button type="primary" htmlType="submit">
            {isEditing ? "Update Entry" : "Add Entry"}
          </Button>
        </Form>
      </Modal>
      <DieselTable />
    </CustomLayout>
  );
};

export default Diesel;
