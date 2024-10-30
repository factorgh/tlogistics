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
import { useCreateFuelStationMutation } from "../../app/services/fuel-station/fuel-station";
import GasTable from "../../components/fuel-station/gas-table";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const Gas = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editRecord, setEditRecord] = useState(null);
  const [createGas, { isLoading }] = useCreateFuelStationMutation();

  // Sample data source
  const [dataSource, setDataSource] = useState([
    {
      key: 1,
      vehicleNo: "ABC 123",
      consumption: 100,
      unitPrice: 1.5,
      amount: "150.00",
      date: "2024-10-01",
      pump: "pump1",
      company: "Company A",
      phoneNumber: "1234567890",
      entity: "forklift",
    },
    {
      key: 2,
      vehicleNo: "XYZ 456",
      consumption: 200,
      unitPrice: 1.2,
      amount: "240.00",
      date: "2024-10-05",
      pump: "pump2",
      company: "Company B",
      phoneNumber: "0987654321",
      entity: "factory",
    },
    // Add more sample entries if needed
  ]);

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
      entity: values.entity,
      status: "Active",
      type: "GAS",
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
        await createGas(newRecord);
        console.log(newRecord); // Create logic
        toast.success("Gas entry created successfully");
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
        <CustomHeader headerTitle={"Gas"} />
        <div>
          <Button type="primary" onClick={handleAdd}>
            Add Entry
          </Button>
        </div>
      </div>

      {/* Add/Edit Button */}

      {/* Modal for Create/Update form */}
      <Modal
        title={isEditing ? "Update Entry" : "Add Entry"}
        visible={isModalVisible}
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
              rules={[{ required: true, message: "Please input consumption!" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Unit Price"
              name="unitPrice"
              rules={[{ required: true, message: "Please input unit price!" }]}
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
              <Select placeholder="Select a pump">
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

      <GasTable dataSource={dataSource} handleEdit={handleEdit} />
    </CustomLayout>
  );
};

export default Gas;
