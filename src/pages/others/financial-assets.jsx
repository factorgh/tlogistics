import { Button, Modal, Table, Tabs, message } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { IoTrash } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { useGetGeneralExpensesQuery } from "../../app/services/financial-assets/general-expense";
import { useGetLogisticsQuery } from "../../app/services/financial-assets/logistics";
import { useGetTransitsQuery } from "../../app/services/financial-assets/transit";
import GeneralExpensesForm from "../../components/others/financial-assets/general-expenses-form";
import LogisticAssetsForm from "../../components/others/financial-assets/logistic-assets-form";
import TransitAndDemurrageForm from "../../components/others/financial-assets/transit-demurrage-form";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const { TabPane } = Tabs;

const FinancialAssets = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formType, setFormType] = useState(null);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [logisticEntries, setLogisticEntries] = useState([]);
  const [transitEntries, setTransitEntries] = useState([]);
  const [generalEntries, setGeneralEntries] = useState([]);
  const { data: logistics, isFetching } = useGetLogisticsQuery();
  const { data: expenses, isFetching: isFetchingExpenses } =
    useGetGeneralExpensesQuery();
  const { data: transit, isFetching: isFetchingTransit } =
    useGetTransitsQuery();

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
      { description: "Port Fees", date: moment("2023-05-15"), amount: 700 },
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

  const showModal = (type, entry) => {
    console.log(entry, "showModal");
    setFormType(type);
    setSelectedEntry(entry); // Set the entry to be updated
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFormType(null);
    setSelectedEntry(null);
  };

  const handleFormSubmit = (entry) => {
    switch (formType) {
      case "logistic":
        if (selectedEntry) {
          // Update existing logistic entry
          const updatedEntries = logisticEntries.map((item) =>
            item.description === selectedEntry.description ? entry : item
          );
          setLogisticEntries(updatedEntries);
        } else {
          setLogisticEntries([...logisticEntries, entry]);
        }
        break;
      case "transit":
        if (selectedEntry) {
          // Update existing transit entry
          const updatedEntries = transitEntries.map((item) =>
            item.description === selectedEntry.description ? entry : item
          );
          setTransitEntries(updatedEntries);
        } else {
          setTransitEntries([...transitEntries, entry]);
        }
        break;
      case "general":
        if (selectedEntry) {
          // Update existing general expense
          const updatedEntries = generalEntries.map((item) =>
            item.description === selectedEntry.description ? entry : item
          );
          setGeneralEntries(updatedEntries);
        } else {
          setGeneralEntries([...generalEntries, entry]);
        }
        break;
      default:
        break;
    }
    setIsModalVisible(false);
    setSelectedEntry(null);
  };

  const handleDelete = (type, entry) => {
    Modal.confirm({
      title: "Are you sure you want to delete this entry?",
      onOk: () => {
        switch (type) {
          case "logistic":
            setLogisticEntries(
              logisticEntries.filter((item) => item !== entry)
            );
            break;
          case "transit":
            setTransitEntries(transitEntries.filter((item) => item !== entry));
            break;
          case "general":
            setGeneralEntries(generalEntries.filter((item) => item !== entry));
            break;
          default:
            break;
        }
        message.success("Entry deleted successfully");
      },
    });
  };

  const logisticColumns = [
    {
      title: "Asset Type",
      dataIndex: "asset_type",
      key: "asset_type",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button onClick={() => showModal("logistic", record)}>Edit</Button>
          <Button
            onClick={() => handleDelete("logistic", record)}
            danger
            style={{ marginLeft: "10px" }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const transitColumns = [
    {
      title: "Job",
      dataIndex: "job",
      key: "job",
    },
    {
      title: "Delay Hours",
      dataIndex: "delay_in_hour",
      key: "delay_in_hour",
    },
    {
      title: "Charge per hour",
      dataIndex: "charge_per_hour",
      key: "charge_per_hour",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <MdEdit
            onClick={() => {
              console.log(record);
              showModal("transit", record);
            }}
          />
          <IoTrash
            onClick={() => handleDelete("transit", record)}
            danger
            style={{ marginLeft: "10px" }}
          />
          Delete
        </div>
      ),
    },
  ];

  const generalColumns = [
    {
      title: "Police Cases & Accidents",
      dataIndex: "police_and_accident",
      key: "police_and_accident",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button onClick={() => showModal("general", record)}>Edit</Button>
          <Button
            onClick={() => handleDelete("general", record)}
            danger
            style={{ marginLeft: "10px" }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const renderForm = () => {
    switch (formType) {
      case "logistic":
        return (
          <LogisticAssetsForm
            onSubmit={handleFormSubmit}
            initialValues={selectedEntry || {}} // Pass selectedEntry to prepopulate
          />
        );
      case "transit":
        return (
          <TransitAndDemurrageForm
            onSubmit={handleFormSubmit}
            initialValues={selectedEntry || {}} // Pass selectedEntry to prepopulate
          />
        );
      case "general":
        return (
          <GeneralExpensesForm
            onSubmit={handleFormSubmit}
            initialValues={selectedEntry || {}} // Pass selectedEntry to prepopulate
          />
        );
      default:
        return null;
    }
  };

  return (
    <CustomLayout>
      <CustomHeader headerTitle="Financial Assets" />
      <Tabs defaultActiveKey="1">
        <TabPane tab="Logistics Assets" key="1">
          <div className="flex justify-between items-center mt-5">
            <h3 className="text-lg font-bold mt-5">Logistics Assets</h3>
            <Button type="primary" onClick={() => showModal("logistic")}>
              Add Logistic Asset
            </Button>
          </div>
          <Table
            loading={isFetching}
            dataSource={logistics?.logistics || logisticEntries}
            columns={logisticColumns}
            rowKey={(record) => record.description}
            style={{ marginTop: "20px" }}
          />
        </TabPane>
        <TabPane tab="Transit & Demurrage" key="2">
          <div className="flex justify-between items-center mt-5">
            <h3 className="text-lg font-bold mt-5">Transit & Demurrage</h3>
            <Button type="primary" onClick={() => showModal("transit")}>
              Add Transit & Demurrage
            </Button>
          </div>
          <Table
            loading={isFetchingTransit}
            dataSource={transit?.transit || transitEntries}
            columns={transitColumns}
            rowKey={(record) => record.description}
            style={{ marginTop: "20px" }}
          />
        </TabPane>
        <TabPane tab="General Expenses" key="3">
          <div className="flex justify-between items-center mt-5">
            <h3 className="text-lg font-bold mt-5">General Expenses</h3>
            <Button type="primary" onClick={() => showModal("general")}>
              Add General Expense
            </Button>
          </div>
          <Table
            loading={isFetchingExpenses}
            dataSource={expenses?.generalExpenses || generalEntries}
            columns={generalColumns}
            rowKey={(record) => record.description}
            style={{ marginTop: "20px" }}
          />
        </TabPane>
      </Tabs>

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
