import VehicleRegistrationForm from "../../components/others/vehicle-registration-form";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const VehicleRegistration = () => {
  return (
    <CustomLayout>
      <CustomHeader headerTitle="VehicleRegistration" />
      <VehicleRegistrationForm />
    </CustomLayout>
  );
};

export default VehicleRegistration;
