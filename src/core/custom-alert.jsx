import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export const showCustomAlert = ({ title, handleConfirm, alertInfo }) => {
  Swal.fire({
    title: title,
    text: alertInfo,
    icon: "warning", // Can be 'success', 'error', 'warning', 'info', or 'question'
    showCancelButton: true,
    confirmButtonText: "Confirm",
    cancelButtonText: "Cancel",
    background: "#f4f6f9",
    customClass: {
      popup: "p-6 rounded-lg shadow-lg border border-gray-200 bg-white",
      title: "text-lg font-semibold text-gray-800",
      confirmButton:
        "bg-blue-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-blue-600",
      cancelButton:
        "bg-red-500 text-white py-2 px-4 rounded focus:outline-none hover:bg-red-600",
    },
    buttonsStyling: false,
  }).then((result) => {
    if (result.isConfirmed) {
      // User confirmed the alert
      handleConfirm();
      console.log("User clicked confirm");
    } else if (result.isDenied || result.isDismissed) {
      console.log("User cancelled the alert");
    }
  });
};
