import { Button } from "antd";
import { MdUploadFile } from "react-icons/md";
import VendorListTable from "../components/vendor/vendor-list-table";
import CustomHeader from "../core/custom-header";

const VendorsList = () => {
  return (
    <div className="bg-white w-full h-full p-5 border border-gray-200 rounded-md">
      <div className=" flex justify-between items-center">
        <CustomHeader headerTitle={"Vendors List"} />
        <div className="flex gap-3 items-center">
          <Button type="primary">Add Vendor</Button>
          <Button
            icon={<MdUploadFile />}
            style={{ backgroundColor: "#1CC88A", color: "#fff" }}
          >
            Excel
          </Button>
        </div>
      </div>
      {/* Quotation form */}
      <VendorListTable />
    </div>
  );
};

export default VendorsList;
