import InsuranceForm from "../../components/others/insurance-form";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const Insurance = () => {
  return (
    <CustomLayout>
      <CustomHeader headerTitle="Insurance" />
      <InsuranceForm />
    </CustomLayout>
  );
};

export default Insurance;
