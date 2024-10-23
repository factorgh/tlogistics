import { Button } from "antd";
import PriceListTable from "../components/shipment/price-list-table";
import CustomHeader from "../core/custom-header";

const PriceList = () => {
  return (
    <div className="bg-white w-full h-full p-5 border border-gray-200 rounded-md">
      <div className=" flex justify-between items-center">
        <CustomHeader headerTitle={"Price List"} />
        <Button type="primary">Add</Button>
      </div>
      {/* Quotation form */}
      <PriceListTable />
    </div>
  );
};

export default PriceList;
