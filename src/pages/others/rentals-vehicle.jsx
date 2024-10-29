import { Button, Form, Input, Modal, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { useCreateRentalMutation } from "../../app/services/rental/rental";
import RentalTable from "../../components/others/financial-assets/rental-table";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const RentalsVehicle = () => {
  const [form] = Form.useForm();
  const [rentalEntries, setRentalEntries] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [createRental, { isLoading }] = useCreateRentalMutation();

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

  const onFinish = async (values) => {
    try {
      const response = await createRental(values).unwrap();
      console.log(response);
      toast.success("Rental Created Successfully");
      setRentalEntries([...rentalEntries, values]);
      form.resetFields();
      setIsModalVisible(false);
    } catch (error) {
      toast.error(error.data.message);
      setIsModalVisible(false);
    }
  };

  const openModal = () => {
    setIsModalVisible(true); // Open modal
  };

  const closeModal = () => {
    setIsModalVisible(false); // Close modal
  };

  return (
    <CustomLayout>
      <div className="flex items-center justify-between ">
        <CustomHeader headerTitle="Rental Vehicles" />
        <Button type="primary" onClick={openModal}>
          Add New Rental
        </Button>
      </div>

      {/* Ant Design Modal for adding a rental vehicle */}
      <Modal
        title="Add Rental Vehicle"
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
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
              <Button className="w-full" htmlType="submit">
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

      {/* Rental Table */}
      <RentalTable />
    </CustomLayout>
  );
};

export default RentalsVehicle;
