import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import RentalTable from "../../components/others/financial-assets/rental-table"; // Assuming this is a custom table component
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";
import CustomModal from "../../core/custom_modal";

const RentalsVehicle = () => {
  const [form] = Form.useForm();
  const [rentalEntries, setRentalEntries] = useState([]); // State for rental vehicle entries

  // Dummy data for initial rendering
  useEffect(() => {
    const dummyData = [
      {
        agentName: "Agent Smith",
        leasingOptions: "Short Term",
        vehicleType: "Truck",
        driverName: "John Doe",
      },
      {
        agentName: "Agent Johnson",
        leasingOptions: "Long Term",
        vehicleType: "Salon Car",
        driverName: "Jane Doe",
      },
    ];
    setRentalEntries(dummyData);
  }, []);

  const onFinish = (values) => {
    // Add new entry to the rentalEntries state
    setRentalEntries([...rentalEntries, values]);
    form.resetFields(); // Reset form fields after submission
  };

  return (
    <CustomLayout>
      <div className="flex items-center justify-between ">
        <CustomHeader headerTitle="Rental Vehicles" />
        <CustomModal title="Add Rental Vehicle" buttonTitle="Add New Rental ">
          <Form form={form} layout="vertical" onFinish={onFinish}>
            {/* Agent Name */}
            <Form.Item
              label="Agent Name"
              name="agentName"
              rules={[
                { required: true, message: "Please enter the agent's name" },
              ]}
            >
              <Input placeholder="Enter agent name" />
            </Form.Item>

            {/* Leasing Options */}
            <Form.Item
              label="Leasing Options"
              name="leasingOptions"
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
              name="vehicleType"
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
              name="driverName"
              rules={[
                { required: true, message: "Please enter the driver's name" },
              ]}
            >
              <Input placeholder="Enter driver name" />
            </Form.Item>

            <Form.Item>
              <Button className="w-full" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </CustomModal>
      </div>

      {/* Rental Table */}
      <RentalTable dataSource={rentalEntries} />
      {/* Assuming RentalTable accepts a dataSource prop for displaying entries */}
    </CustomLayout>
  );
};

export default RentalsVehicle;
