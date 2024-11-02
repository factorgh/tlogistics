import UpdateShipmentForm from "../components/shipment/update-shipment";
import CustomHeader from "../core/custom-header";

const ShipmentUpdate = () => {
  return (
    <div className="bg-white w-full h-full p-5 border border-gray-200 rounded-md overflow-auto">
      <CustomHeader headerTitle={"Shipment Info"} />{" "}
      <div>
        {/* Add customer form */}
        <UpdateShipmentForm />
      </div>
    </div>
  );
};

export default ShipmentUpdate;
