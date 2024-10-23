import { Button, Dropdown } from "antd";
import { MdDownload, MdFilterAlt, MdUploadFile } from "react-icons/md";
import VendorExpensesTable from "../components/vendor/vendor-expenses-table";
import CustomHeader from "../core/custom-header";

const VendorExpenses = () => {
  const items = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item
        </a>
      ),
    },
  ];
  return (
    <div className="bg-white w-full h-full p-5 border border-gray-200 rounded-md">
      <div className=" flex justify-between items-center">
        <CustomHeader headerTitle={"Vendor Expenses"} />
        <div className="flex gap-3 items-center">
          <Button type="primary">Add Expenses</Button>
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
          <Dropdown menu={{ items }} placement="bottomRight">
            <Button>
              Last month <MdFilterAlt />
            </Button>
          </Dropdown>
        </div>
      </div>
      {/* Quotation form */}
      <VendorExpensesTable />
    </div>
  );
};

export default VendorExpenses;
