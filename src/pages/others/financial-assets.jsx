import { Button, Modal, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import GeneralExpensesForm from "../../components/others/financial-assets/general-expenses-form";
import LogisticAssetsForm from "../../components/others/financial-assets/logistic-assets-form";
import TransitAndDemurrageForm from "../../components/others/financial-assets/transit-demurrage-form";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const FinancialAssets = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formType, setFormType] = useState(null);
  const [logisticEntries, setLogisticEntries] = useState([]);
  const [transitEntries, setTransitEntries] = useState([]);
  const [generalEntries, setGeneralEntries] = useState([]);

  // Function to show modal
  const showModal = (type) => {
    setFormType(type);
    setIsModalVisible(true);
  };

  // Function to handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
    setFormType(null);
  };

  // Handle form submission
  const handleFormSubmit = (entry) => {
    switch (formType) {
      case "logistic":
        setLogisticEntries([...logisticEntries, entry]);
        break;
      case "transit":
        setTransitEntries([...transitEntries, entry]);
        break;
      case "general":
        setGeneralEntries([...generalEntries, entry]);
        break;
      default:
        break;
    }
    setIsModalVisible(false);
  };

  // Table columns
  const logisticColumns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => date.format("YYYY-MM-DD"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  const transitColumns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => date.format("YYYY-MM-DD"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  const generalColumns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => date.format("YYYY-MM-DD"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  // Dummy data for initial rendering
  useEffect(() => {
    const dummyLogisticData = [
      {
        description: "Delivery Truck",
        date: moment("2023-01-15"),
        amount: 20000,
      },
      {
        description: "Warehouse Lease",
        date: moment("2023-04-10"),
        amount: 5000,
      },
    ];

    const dummyTransitData = [
      {
        description: "Container Detention",
        date: moment("2023-02-20"),
        amount: 1500,
      },
      {
        description: "Port Fees",
        date: moment("2023-05-15"),
        amount: 700,
      },
    ];

    const dummyGeneralData = [
      {
        description: "Office Supplies",
        date: moment("2023-03-05"),
        amount: 300,
      },
    ];

    setLogisticEntries(dummyLogisticData);
    setTransitEntries(dummyTransitData);
    setGeneralEntries(dummyGeneralData);
  }, []);

  const renderForm = () => {
    switch (formType) {
      case "logistic":
        return <LogisticAssetsForm onSubmit={handleFormSubmit} />;
      case "transit":
        return <TransitAndDemurrageForm onSubmit={handleFormSubmit} />;
      case "general":
        return <GeneralExpensesForm onSubmit={handleFormSubmit} />;
      default:
        return null;
    }
  };

  return (
    <CustomLayout>
      <CustomHeader headerTitle="Financial Assets" />
      <div className="flex flex-col gap-4"></div>
      <div className="flex justify-between items-center mt-5">
        <h3 className="text-lg font-bold mt-5">Logistics Assets</h3>{" "}
        <Button type="primary" onClick={() => showModal("logistic")}>
          Add Logistic Asset
        </Button>
      </div>
      <Table
        dataSource={logisticEntries}
        columns={logisticColumns}
        rowKey={(record) => record.description} // Assuming description is unique
        style={{ marginTop: "20px" }}
      />
      <div className="flex justify-between items-center mt-5">
        <h3 className="text-lg font-bold mt-5">Transit & Demurrage</h3>{" "}
        <Button type="primary" onClick={() => showModal("transit")}>
          Add Transit & Demurrage
        </Button>
      </div>
      <Table
        dataSource={transitEntries}
        columns={transitColumns}
        rowKey={(record) => record.description} // Assuming description is unique
        style={{ marginTop: "20px" }}
      />
      <div className="flex justify-between items-center mt-5">
        <h3 className="text-lg font-bold mt-5">General Expenses</h3>
        <Button type="primary" onClick={() => showModal("general")}>
          Add General Expense
        </Button>
      </div>
      <Table
        dataSource={generalEntries}
        columns={generalColumns}
        rowKey={(record) => record.description} // Assuming description is unique
        style={{ marginTop: "20px" }}
      />
      <Modal
        title={`${
          formType === "logistic"
            ? "Logistic"
            : formType === "transit"
            ? "Transit & Demurrage"
            : "General Expenses"
        } Form`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {renderForm()}
      </Modal>
    </CustomLayout>
  );
};

export default FinancialAssets;
