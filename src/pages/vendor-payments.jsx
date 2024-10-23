import { Button } from "antd";
import { MdDownload, MdUploadFile } from "react-icons/md";
import VendorExpensesTable from "../components/vendor/vendor-expenses-table";
import CustomHeader from "../core/custom-header";

const VendorPayment = () => {
  return (
    <div className="bg-white w-full h-full p-5 border border-gray-200 rounded-md">
      <div className=" flex justify-between items-center">
        <CustomHeader headerTitle={"Vendor Payments"} />
        <div className="flex gap-3 items-center">
          <Button
            icon={<MdDownload />}
            style={{ backgroundColor: "red", color: "#fff" }}
          >
            PDF
          </Button>
          <Button
            icon={<MdUploadFile />}
            style={{ backgroundColor: "#1CC88A", color: "#fff" }}
          >
            Excel
          </Button>
        </div>
      </div>
      {/* Quotation form */}
      <VendorExpensesTable />
    </div>
  );
};
export default VendorPayment;
