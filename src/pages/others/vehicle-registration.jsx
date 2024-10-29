import { Button, DatePicker, Modal, Table } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateRegistrationMutation,
  useGetRegistrationsQuery,
} from "../../app/services/registration/registration";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

import { Form, Input, InputNumber, Select, Spin } from "antd";
import moment from "moment";

const VehicleRegistration = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [createRegistration, { isLoading }] = useCreateRegistrationMutation();
  const { data, isFetching } = useGetRegistrationsQuery();
  console.log(data?.vehicleRegistration);

  // Function to show modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle form submission
  const handleFormSubmit = async (entry) => {
    const transformed_entry = {
      ...entry,
      start_date: entry.start_date.$d,
      expiring_date: entry.expiring_date.$d,
    };

    try {
      console.log("Vehicle entry submitted:", transformed_entry);
      await createRegistration(transformed_entry);
      setIsModalVisible(false);
      toast.success("Vehicle Registered Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to register vehicle");
    }
    // setVehicleEntries([...vehicleEntries, entry]);
    setIsModalVisible(false);
  };

  // Table columns
  const columns = [
    {
      title: "Vehicle Number",
      dataIndex: "registration_number",
      key: "registration_number",
    },
    {
      title: "Registration",
      dataIndex: "registration",
      key: "registration",
    },
    {
      title: "Number Plate",
      dataIndex: "number_plate",
      key: "number_plate",
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicle_type",
      key: "vehicle_type",
    },
    {
      title: "Registration Date",
      dataIndex: "start_date",
      key: "registrationDate",
      render: (date) => moment(date).format("YYYY-MM-DD"), // or use another format like "MMMM D, YYYY" for a more readable format
    },
    {
      title: "Expiry Date",
      dataIndex: "expiring_date",
      key: "expiring_date",
      render: (date) => moment(date).format("YYYY-MM-DD"), // or other desired format
    },
  ];

  // Dummy data for initial rendering

  return (
    <CustomLayout>
      <div className="flex justify-between items-center">
        <CustomHeader headerTitle="Vehicle Registration" />
        <Button type="primary" onClick={showModal}>
          Add Vehicle Registration
        </Button>

        <Modal
          title="Vehicle Registration Form"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form layout="vertical" onFinish={handleFormSubmit}>
            {/* Vehicle Registration */}
            <Form.Item
              label="Registration"
              name="registration"
              rules={[
                {
                  required: true,
                  message: "Please enter the registration details!",
                },
              ]}
            >
              <Input placeholder="Enter Vehicle Registration" />
            </Form.Item>

            {/* Vehicle Registration Number & Plate Type */}
            <Form.Item
              label="Vehicle Registration Number"
              name="registration_number"
              rules={[
                {
                  required: true,
                  message: "Please enter the registration number!",
                },
              ]}
            >
              <Input placeholder="Enter Registration Number" />
            </Form.Item>

            <Form.Item
              label="Number Plate Type"
              name="number_plate"
              rules={[
                {
                  required: true,
                  message: "Please select the number plate type!",
                },
              ]}
            >
              <Select placeholder="Select Number Plate Type">
                <Select.Option value="commercial">Commercial</Select.Option>
                <Select.Option value="private">Private</Select.Option>
              </Select>
            </Form.Item>

            {/* Penalty Reduction */}
            <Form.Item
              label="Penalty Reduction"
              name="penalty_reduction"
              rules={[
                {
                  required: true,
                  message: "Please enter penalty reduction amount!",
                },
              ]}
            >
              <InputNumber
                placeholder="Enter Penalty Reduction (if any)"
                style={{ width: "100%" }}
              />
            </Form.Item>

            {/* Type of Vehicle Registered */}
            <Form.Item
              label="Type of Vehicle Registered"
              name="vehicle_type"
              rules={[
                {
                  required: true,
                  message: "Please select the type of vehicle!",
                },
              ]}
            >
              <Select placeholder="Select Type of Vehicle">
                <Select.Option value="truck">Truck</Select.Option>
                <Select.Option value="salonCar">Salon Car</Select.Option>
              </Select>
            </Form.Item>

            {/* Starting & Expiring Date */}

            <Form.Item
              label="Start Date"
              name="start_date"
              rules={[
                {
                  required: true,
                  message: "Please select the start date!",
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item
              label="Expiring Date"
              name="expiring_date"
              rules={[
                {
                  required: true,
                  message: "Please select the start date!",
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            {/* Submit Button */}
            <Form.Item>
              <div className="">
                {isLoading ? (
                  <Button className="w-full" type="ghost" disabled block>
                    <Spin />
                  </Button>
                ) : (
                  <Button
                    className="w-full"
                    type="primary"
                    htmlType="submit"
                    block
                  >
                    Submit
                  </Button>
                )}
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <Table
        loading={isFetching}
        dataSource={data?.vehicleRegistration}
        columns={columns}
        rowKey={(record) => record.vehicleNumber}
        style={{ marginTop: "20px" }}
      />
    </CustomLayout>
  );
};

export default VehicleRegistration;
