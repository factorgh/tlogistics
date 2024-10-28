import { Button, Modal, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import InsuranceForm from "../../components/others/insurance-form";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const Insurance = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [insuranceEntries, setInsuranceEntries] = useState([]);

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
    setInsuranceEntries([...insuranceEntries, entry]);
    setIsModalVisible(false);
  };

  // Table columns
  const columns = [
    {
      title: "Insurance Number",
      dataIndex: "insuranceNumber",
      key: "insuranceNumber",
    },
    {
      title: "Insurer",
      dataIndex: "insurer",
      key: "insurer",
    },
    {
      title: "Insurance Period",
      dataIndex: "insurancePeriod",
      key: "insurancePeriod",
      render: (period) =>
        `${period[0].format("YYYY-MM-DD")} - ${period[1].format("YYYY-MM-DD")}`,
    },
    {
      title: "Claims",
      dataIndex: "claims",
      key: "claims",
      render: (claims) => claims.map((claim) => claim.description).join(", "),
    },
    {
      title: "Invoices",
      dataIndex: "invoices",
      key: "invoices",
      render: (invoices) =>
        invoices.map((invoice) => invoice.number).join(", "),
    },
    {
      title: "Refunds",
      dataIndex: "refunds",
      key: "refunds",
      render: (refunds) => refunds.map((refund) => refund.chequeNo).join(", "),
    },
  ];

  // Dummy data for initial rendering
  useEffect(() => {
    const dummyData = [
      {
        insuranceNumber: "INS12345",
        insurer: "Insurer A",
        insurancePeriod: [moment("2023-01-01"), moment("2024-01-01")],
        claims: [{ description: "Claim A1" }, { description: "Claim A2" }],
        invoices: [{ number: "INV001" }, { number: "INV002" }],
        refunds: [{ chequeNo: "CHEQ001" }],
      },
      {
        insuranceNumber: "INS12346",
        insurer: "Insurer B",
        insurancePeriod: [moment("2023-06-01"), moment("2024-06-01")],
        claims: [{ description: "Claim B1" }],
        invoices: [{ number: "INV003" }],
        refunds: [],
      },
      {
        insuranceNumber: "INS12347",
        insurer: "Insurer C",
        insurancePeriod: [moment("2022-12-01"), moment("2023-12-01")],
        claims: [{ description: "Claim C1" }, { description: "Claim C2" }],
        invoices: [{ number: "INV004" }, { number: "INV005" }],
        refunds: [{ chequeNo: "CHEQ002" }],
      },
      {
        insuranceNumber: "INS12348",
        insurer: "Insurer D",
        insurancePeriod: [moment("2023-03-01"), moment("2024-03-01")],
        claims: [],
        invoices: [{ number: "INV006" }],
        refunds: [{ chequeNo: "CHEQ003" }],
      },
      {
        insuranceNumber: "INS12349",
        insurer: "Insurer E",
        insurancePeriod: [moment("2023-08-01"), moment("2024-08-01")],
        claims: [{ description: "Claim E1" }],
        invoices: [],
        refunds: [{ chequeNo: "CHEQ004" }],
      },
    ];

    setInsuranceEntries(dummyData);
  }, []);

  return (
    <CustomLayout>
      <div className="flex justify-between items-center">
        <CustomHeader headerTitle="Insurance" />
        <Button type="primary" onClick={showModal}>
          Add Insurance
        </Button>

        <Modal
          title="Insurance Form"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <InsuranceForm onSubmit={handleFormSubmit} />
        </Modal>
      </div>
      <Table
        dataSource={insuranceEntries}
        columns={columns}
        rowKey={(record) => record.insuranceNumber}
        style={{ marginTop: "20px" }}
      />
    </CustomLayout>
  );
};

export default Insurance;
