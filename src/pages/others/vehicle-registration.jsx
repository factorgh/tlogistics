import { Button, Modal, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import VehicleRegistrationForm from "../../components/others/vehicle-registration-form";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const VehicleRegistration = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [vehicleEntries, setVehicleEntries] = useState([]);

  // Function to show modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle form submission
  const handleFormSubmit = (entry) => {
    setVehicleEntries([...vehicleEntries, entry]);
    setIsModalVisible(false);
  };

  // Table columns
  const columns = [
    {
      title: "Vehicle Number",
      dataIndex: "vehicleNumber",
      key: "vehicleNumber",
    },
    {
      title: "Owner Name",
      dataIndex: "ownerName",
      key: "ownerName",
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicleType",
      key: "vehicleType",
    },
    {
      title: "Registration Date",
      dataIndex: "registrationDate",
      key: "registrationDate",
      render: (date) => date.format("YYYY-MM-DD"),
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (date) => date.format("YYYY-MM-DD"),
    },
  ];

  // Dummy data for initial rendering
  useEffect(() => {
    const dummyData = [
      {
        vehicleNumber: "ABC1234",
        ownerName: "John Doe",
        vehicleType: "Sedan",
        registrationDate: moment("2023-01-01"),
        expiryDate: moment("2024-01-01"),
      },
      {
        vehicleNumber: "XYZ5678",
        ownerName: "Jane Smith",
        vehicleType: "SUV",
        registrationDate: moment("2022-06-15"),
        expiryDate: moment("2024-06-15"),
      },
      {
        vehicleNumber: "LMN9101",
        ownerName: "Bob Johnson",
        vehicleType: "Truck",
        registrationDate: moment("2023-03-01"),
        expiryDate: moment("2025-03-01"),
      },
      {
        vehicleNumber: "OPQ2345",
        ownerName: "Alice Williams",
        vehicleType: "Coupe",
        registrationDate: moment("2023-08-10"),
        expiryDate: moment("2024-08-10"),
      },
      {
        vehicleNumber: "RST6789",
        ownerName: "Charlie Brown",
        vehicleType: "Hatchback",
        registrationDate: moment("2023-05-20"),
        expiryDate: moment("2024-05-20"),
      },
    ];

    setVehicleEntries(dummyData);
  }, []);

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
          <VehicleRegistrationForm onSubmit={handleFormSubmit} />
        </Modal>
      </div>
      <Table
        dataSource={vehicleEntries}
        columns={columns}
        rowKey={(record) => record.vehicleNumber}
        style={{ marginTop: "20px" }}
      />
    </CustomLayout>
  );
};

export default VehicleRegistration;
