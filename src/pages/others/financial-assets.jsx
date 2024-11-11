import { Tabs } from "antd";
import GeneralExpensesModal from "../../components/others/financial-assets/general-expenses-form";
import LogisticAssetsModal from "../../components/others/financial-assets/logistic-assets-form";
import GeneralExpenseTable from "../../components/others/financial-assets/tables/general-expense-table";
import LogisticsTable from "../../components/others/financial-assets/tables/logistics-table";
import TransitTable from "../../components/others/financial-assets/tables/transit-table";
import TransitAndDemurrageModal from "../../components/others/financial-assets/transit-demurrage-form";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const FinancialAssets = () => {
  return (
    <CustomLayout>
      <CustomHeader headerTitle="Financial Assets" />
      <Tabs
        defaultActiveKey="1"
        items={[
          {
            label: "Logistics Assets",
            key: "1",
            children: (
              <div>
                <div className="flex justify-end items-center mt-5 p-3">
                  <LogisticAssetsModal />
                </div>
                <LogisticsTable />
              </div>
            ),
          },
          {
            label: "Transit & Demurrage",
            key: "2",
            children: (
              <div>
                <div className="flex justify-end items-center mt-5 p-3">
                  <TransitAndDemurrageModal />
                </div>
                <TransitTable />
              </div>
            ),
          },
          {
            label: "General Expenses",
            key: "3",
            children: (
              <div>
                <div className="flex justify-end items-center mt-5 p-3">
                  <GeneralExpensesModal />
                </div>
                <GeneralExpenseTable />
              </div>
            ),
          },
        ]}
      />
    </CustomLayout>
  );
};

export default FinancialAssets;
