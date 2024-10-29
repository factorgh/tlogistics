import { Button, Modal, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useGetInsurancesQuery } from "../../app/services/insurance/insurance";
import InsuranceForm from "../../components/others/insurance-form";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const Insurance = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [insuranceEntries, setInsuranceEntries] = useState([]);
  const { data, isFetching } = useGetInsurancesQuery();

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
    console.log("Insurance entry submitted:", entry);
    setIsModalVisible(false);
  };

  // Table columns
  const columns = [
    {
      title: "Insurer",
      dataIndex: "insurer",
      key: "insurer",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Claims",
      dataIndex: "claims",
      key: "claims",
      render: (claims) =>
        claims?.map((claim) => claim.description).join(", ") || "No Claims",
    },
    {
      title: "Invoices",
      dataIndex: "invoices",
      key: "invoices",
      render: (invoices) =>
        invoices?.map((invoice) => invoice.number).join(", ") || "No Invoices",
    },
    {
      title: "Refunds",
      dataIndex: "refunds",
      key: "refunds",
      render: (refunds) =>
        refunds?.map((refund) => refund.chequeNo).join(", ") || "No Refunds",
    },
  ];

  // Dummy data for initial rendering
  useEffect(() => {
    const dummyData = [
      {
        insuranceNumber: "INS12345",
        insurer: "Insurer A",
        start_date: moment("2023-01-01"),
        end_date: moment("2024-01-01"),
        claims: [{ description: "Claim A1" }, { description: "Claim A2" }],
        invoices: [{ number: "INV001" }, { number: "INV002" }],
        refunds: [{ chequeNo: "CHEQ001" }],
      },
      {
        insuranceNumber: "INS12346",
        insurer: "Insurer B",
        start_date: moment("2023-06-01"),
        end_date: moment("2024-06-01"),
        claims: [{ description: "Claim B1" }],
        invoices: [{ number: "INV003" }],
        refunds: [],
      },
      {
        insuranceNumber: "INS12347",
        insurer: "Insurer C",
        start_date: moment("2022-12-01"),
        end_date: moment("2023-12-01"),
        claims: [{ description: "Claim C1" }, { description: "Claim C2" }],
        invoices: [{ number: "INV004" }, { number: "INV005" }],
        refunds: [{ chequeNo: "CHEQ002" }],
      },
      {
        insuranceNumber: "INS12348",
        insurer: "Insurer D",
        start_date: moment("2023-03-01"),
        end_date: moment("2024-03-01"),
        claims: [],
        invoices: [{ number: "INV006" }],
        refunds: [{ chequeNo: "CHEQ003" }],
      },
      {
        insuranceNumber: "INS12349",
        insurer: "Insurer E",
        start_date: moment("2023-08-01"),
        end_date: moment("2024-08-01"),
        claims: [{ description: "Claim E1" }],
        invoices: [],
        refunds: [{ chequeNo: "CHEQ004" }],
      },
    ];

    // Use dummy data if data is not available
    setInsuranceEntries(data?.insurances || dummyData);
  }, [data]);

  return (
    <CustomLayout>
      <div className="flex justify-between items-center">
        <CustomHeader headerTitle="Insurance" />
        <Button type="primary" onClick={showModal}>
          Add Insurance
        </Button>

        <Modal
          title="Insurance Form"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <InsuranceForm onSubmit={handleFormSubmit} />
        </Modal>
      </div>
      <Table
        loading={isFetching}
        dataSource={insuranceEntries} // Use the state here
        columns={columns}
        style={{ marginTop: "20px" }}
      />
    </CustomLayout>
  );
};

export default Insurance;
