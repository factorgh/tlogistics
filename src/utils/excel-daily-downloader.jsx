/* eslint-disable react/prop-types */
import { Button } from "antd";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

const ExportDailyExcel = ({ data, children }) => {
  // Function to filter data based on the current date
  const getCurrentDayData = () => {
    const currentDate = new Date();
    const today = currentDate.toISOString().split("T")[0]; // Format YYYY-MM-DD

    return data.filter((item) => {
      const itemDate = new Date(item.createdAt).toISOString().split("T")[0];
      return itemDate === today;
    });
  };

  // Function to export filtered data to Excel
  const exportToExcel = () => {
    const currentData = getCurrentDayData();

    // Check if there's any data to export
    if (currentData.length === 0) {
      toast.error("No data available for the current day");
      return;
    }

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Convert JSON data to worksheet
    const ws = XLSX.utils.json_to_sheet(currentData);

    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Daily Data", "Data");

    // Generate the Excel file and trigger download
    XLSX.writeFile(wb, "daily_data.xlsx");
  };

  return (
    <Button className="bg-green-500 ml-3 text-white" onClick={exportToExcel}>
      {children}
    </Button>
  );
};

export default ExportDailyExcel;
