/* eslint-disable react/prop-types */
import { Button } from "antd";

const CustomAction = ({ color, onClick, title, icon, bgColor }) => {
  return (
    <Button
      className="text-sm shadow-lg"
      color={color}
      variant="solid"
      icon={icon}
      size={"large"}
      onClick={onClick}
      style={{ backgroundColor: bgColor, color: "white" }}
    >
      {title}
    </Button>
  );
};

export default CustomAction;
