/* eslint-disable react/prop-types */
import { Card } from "antd";
import { getBorderColor } from "../../utils/get-border-color";

// You can dynamically set a color based on the title, text, or other conditions

const DashboardItem = ({ headerTitle, text, icon, headerText }) => {
  const borderColor = getBorderColor(headerTitle);

  return (
    <Card className={`border-l-4 ${borderColor} `}>
      <div className="flex justify-between items-center">
        <div>
          <h5 className="text-sm  text-gray-600">{headerText}</h5>
          <p className="text-2xl font-bold ">{text}</p>
        </div>
        <div className={`text-[#DDDFEB]${borderColor}`}>{icon}</div>
      </div>
    </Card>
  );
};

export default DashboardItem;
