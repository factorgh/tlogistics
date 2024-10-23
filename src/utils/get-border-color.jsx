export const getBorderColor = (headerTitle) => {
  switch (headerTitle) {
    case "Success":
      return "border-green-500";
    case "Warning":
      return "border-yellow-500";
    case "Error":
      return "border-red-500";
    default:
      return "border-blue-500"; // Default color
  }
};
