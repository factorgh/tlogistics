import { Button } from "antd";
import { MdUploadFile } from "react-icons/md";
import CustomerList from "../components/customer/customer-list";
import CustomHeader from "../core/custom-header";

const ListCustomers = () => {
  return (
    <div className="bg-white w-full h-full p-5 border border-gray-200 rounded-md">
      <div className="w-full  flex justify-between items-center mb-5">
        <CustomHeader headerTitle={"Customer List"} />
        <Button
          type="default"
          className="text-white bg-green-500"
          icon={<MdUploadFile />}
        >
          Excel
        </Button>
      </div>
      <CustomerList />
    </div>
  );
};

export default ListCustomers;
