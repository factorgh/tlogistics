/* eslint-disable react/prop-types */
import { Button } from "antd";
import { MdUploadFile } from "react-icons/md";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

const ExportExcel = ({ children, data }) => {
  // Function to filter data based on the current month
  console.log(`data`, data);
  const getCurrentMonthData = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); // 0-indexed (0 = January)
    const currentYear = currentDate.getFullYear();

    // Filter the data to get records for the current month
    return data.filter((item) => {
      const itemDate = new Date(item.createdAt);
      return (
        itemDate.getMonth() === currentMonth &&
        itemDate.getFullYear() === currentYear
      );
    });
  };

  // Function to export filtered data to Excel
  const exportToExcel = () => {
    // Get the current month data
    const currentMonthData = getCurrentMonthData();

    // Check if there's any data to export
    if (currentMonthData.length === 0) {
      toast.error("No data available for the current month");
      return;
    }

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert JSON data to worksheet
    const ws = XLSX.utils.json_to_sheet(currentMonthData);

    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Monthly Data");

    // Generate the Excel file and trigger download
    XLSX.writeFile(wb, "monthly_data.xlsx");
  };

  return (
    <div>
      <Button
        style={{ backgroundColor: "#1CC88A", color: "#fff" }}
        icon={<MdUploadFile />}
        type=""
        onClick={exportToExcel}
      >
        {children}
      </Button>
    </div>
  );
};

export default ExportExcel;
