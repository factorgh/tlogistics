/* eslint-disable react/prop-types */
import { Button } from "antd";
import * as XLSX from "xlsx";

const ExportDailyExcel = ({ data }) => {
  // Function to filter data based on the current date
  const getCurrentDayData = () => {
    const currentDate = new Date();
    const today = currentDate.toISOString().split("T")[0]; // Format YYYY-MM-DD

    return data.filter((item) => {
      const itemDate = new Date(item.date).toISOString().split("T")[0];
      return itemDate === today;
    });
  };

  // Function to export filtered data to Excel
  const exportToExcel = () => {
    const currentData = getCurrentDayData();

    // Check if there's any data to export
    if (currentData.length === 0) {
      alert("No data available for today.");
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
    <Button type="primary" onClick={exportToExcel}>
      Download Daily Report
    </Button>
  );
};

export default ExportDailyExcel;
