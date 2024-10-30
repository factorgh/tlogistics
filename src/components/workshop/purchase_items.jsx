import { CloseOutlined } from "@ant-design/icons";
import { Button, Input, List } from "antd";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const PartsInput = ({ onPartsChange, title }) => {
  const [partName, setPartName] = useState("");
  const [partCost, setPartCost] = useState("");
  const [partsList, setPartsList] = useState([]);

  // Add part to the list with both name and cost
  const addPart = () => {
    if (partName.trim() && partCost.trim()) {
      const newPart = { name: partName, cost: partCost };
      setPartsList((prev) => [...prev, newPart]);
      setPartName("");
      setPartCost("");
    }
  };

  // Remove part from the list
  const removePart = (index) => {
    const updatedList = partsList.filter((_, i) => i !== index);
    setPartsList(updatedList);
  };

  // Forward parts list to parent
  useEffect(() => {
    onPartsChange(partsList);
  }, [partsList, onPartsChange]);

  return (
    <div className="mb-5">
      <h5>{title}</h5>
      <div style={{ display: "flex", gap: "8px", marginBottom: 16 }}>
        <Input
          value={partName}
          placeholder={`Enter ${title.toLowerCase()} name`}
          onChange={(e) => setPartName(e.target.value)}
          style={{ flex: 1 }}
        />

        <Input
          value={partCost}
          placeholder="Enter cost"
          onChange={(e) => setPartCost(e.target.value)}
          type="number"
          style={{ width: 100 }}
        />

        <Button type="primary" onClick={addPart}>
          Add
        </Button>
      </div>

      <List
        bordered
        dataSource={partsList}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <CloseOutlined key="close" onClick={() => removePart(index)} />,
            ]}
          >
            {`${item.name} - ${item.cost}`}
          </List.Item>
        )}
      />
    </div>
  );
};

PartsInput.propTypes = {
  onPartsChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default PartsInput;
