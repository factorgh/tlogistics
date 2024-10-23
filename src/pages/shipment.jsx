import ShipmentListTable from "../components/shipment/shipment-list-table";
import CustomHeader from "../core/custom-header";

const Shipment = () => {
  return (
    <div className="bg-white w-full h-full p-5 border border-gray-200 rounded-md">
      <CustomHeader headerTitle={"Shipment List"} />
      {/* Quotation form */}
      <ShipmentListTable />
    </div>
  );
};

export default Shipment;
