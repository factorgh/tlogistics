import { useGetVendorsQuery } from "../app/services/vendors/vendors";
import VendorExpensesTable from "../components/vendor/vendor-expenses-table";
import CustomHeader from "../core/custom-header";
import ExportExcel from "../utils/excel-dowaloader";

const VendorPayment = () => {
  const { data } = useGetVendorsQuery();
  return (
    <div className="bg-white w-full h-full p-5 border border-gray-200 rounded-md">
      <div className=" flex justify-between items-center">
        <CustomHeader headerTitle={"Vendor Payments"} />
        <div className="flex gap-3 items-center">
          <ExportExcel data={data?.vendors}>
            <h5>Excel</h5>
          </ExportExcel>
        </div>
      </div>
      {/* Quotation form */}
      <VendorExpensesTable />
    </div>
  );
};
export default VendorPayment;
