import CreateShipmentForm from "../components/shipment/create-shipment";
import CustomHeader from "../core/custom-header";

const CreateShipment = () => {
  return (
    <div className="bg-white w-full h-full p-5 border border-gray-200 rounded-md overflow-auto">
      <CustomHeader headerTitle={"Shipment Info"} />{" "}
      <div>
        {/* Add customer form */}
        <CreateShipmentForm />
      </div>
    </div>
  );
};

export default CreateShipment;
