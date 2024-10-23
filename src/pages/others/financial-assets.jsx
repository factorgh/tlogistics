import GeneralExpensesForm from "../../components/others/financial-assets/general-expenses-form";
import LogisticAssetsForm from "../../components/others/financial-assets/logistic-assets-form";
import TransitAndDemurrageForm from "../../components/others/financial-assets/transit-demurrage-form";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const FinancialAssets = () => {
  return (
    <CustomLayout>
      <CustomHeader headerTitle="Financial Assets" />
      <div className="">
        <h3 className="text-xl font-bold mb-3">Logistics</h3>
        <LogisticAssetsForm />
      </div>
      <div>
        <h3 className="text-xl font-bold mb-3">Transit & Demurrage</h3>
        <TransitAndDemurrageForm />
      </div>
      <div>
        <h3 className="text-xl font-bold mb-3">General Expenses</h3>
        <GeneralExpensesForm />
      </div>
    </CustomLayout>
  );
};

export default FinancialAssets;
