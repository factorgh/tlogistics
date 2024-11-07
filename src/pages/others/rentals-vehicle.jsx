import { Button, Form, Input, Modal, Select, Spin } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";

import {
  useCreateRentalMutation,
  useUpdateRentalMutation,
} from "../../app/services/rental/rental";
import RentalTable from "../../components/others/financial-assets/rental-table";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const RentalsVehicle = () => {
  const [form] = Form.useForm();
  const [rentalEntries, setRentalEntries] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editRentalData, setEditRentalData] = useState(null);

  const [createRental, { isLoading }] = useCreateRentalMutation();
  const [updateRental, { isLoading: isUpdating }] = useUpdateRentalMutation();
  console.log(updateRental);

  // Dummy data for initial rendering

  const openModal = () => {
    setIsModalVisible(true); // Open modal
    setIsEditMode(false); // Reset to Add mode
    form.resetFields(); // Clear form fields for new entry
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setIsEditMode(false);
    setEditRentalData(null);
  };

  // Show the modal for editing
  const openEditModal = (entry) => {
    setIsModalVisible(true);
    setIsEditMode(true);
    setEditRentalData(entry);
    form.setFieldsValue({
      agent_name: entry.agentName,
      leasing: entry.leasingOptions,
      vehicle_type: entry.vehicleType,
      driver_name: entry.driverName,
    });
  };

  const onFinish = async (values) => {
    try {
      if (isEditMode) {
        // Update rental entry
        const updatedEntry = await updateRental({
          id: editRentalData.id,
          ...values,
        }).unwrap();
        toast.success("Rental Updated Successfully");
        const updatedEntries = rentalEntries.map((entry) =>
          entry.id === updatedEntry.id ? updatedEntry : entry
        );
        setRentalEntries(updatedEntries);
      } else {
        // Create new rental entry
        const newEntry = await createRental(values).unwrap();
        toast.success("Rental Created Successfully");
        setRentalEntries([...rentalEntries, newEntry]);
      }
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to process the rental entry");
      setIsModalVisible(false);
    }
  };

  return (
    <CustomLayout>
      <div className="flex items-center justify-between">
        <CustomHeader headerTitle="Rental Vehicles" />
        <Button type="primary" onClick={openModal}>
          Add New Rental
        </Button>
      </div>

      {/* Ant Design Modal for adding/editing a rental vehicle */}
      <Modal
        title={isEditMode ? "Edit Rental Vehicle" : "Add Rental Vehicle"} // Dynamic title
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
            {isLoading || isUpdating ? (
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

      {/* Rental Table */}
      <RentalTable rentalEntries={rentalEntries} onEdit={openEditModal} />
    </CustomLayout>
  );
};

export default RentalsVehicle;
