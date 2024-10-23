import CreateCustomerForm from "../components/customer/create-customer-form";
import CustomHeader from "../core/custom-header";

const AddCustomer = () => {
  return (
    <div className="bg-white w-full h-full p-5 border border-gray-200 rounded-md">
      <CustomHeader headerTitle="Add Customer" />
      <div>
        {/* Add customer form */}
        <CreateCustomerForm />
      </div>
    </div>
  );
};

export default AddCustomer;
