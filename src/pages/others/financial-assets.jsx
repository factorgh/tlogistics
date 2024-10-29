import { Button, Modal, Table, Tabs } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
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
  const [logisticEntries, setLogisticEntries] = useState([]);
  const [transitEntries, setTransitEntries] = useState([]);
  const [generalEntries, setGeneralEntries] = useState([]);
  const { data: logistics, isFetching } = useGetLogisticsQuery();
  const { data: expenses, isFetching: isFetchingExpenses } =
    useGetGeneralExpensesQuery();
  const { data: transit, isFetching: isFetchingTransit } =
    useGetTransitsQuery();
  console.log(logistics?.logistics);
  console.log(expenses);
  console.log(transit);

  const showModal = (type) => {
    setFormType(type);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setFormType(null);
  };

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

  const logisticColumns = [
    {
      title: "Asset Type",
      dataIndex: "asset_type",
      key: "asset_type",
    },
    {
      title: "details",
      dataIndex: "details",
      key: "details",
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
  ];

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
            dataSource={logistics?.logistics}
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
            dataSource={transit?.transit}
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
            dataSource={expenses?.generalExpenses}
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
