/* eslint-disable react/prop-types */
import { CloseOutlined } from "@ant-design/icons";
import { Button, Input, List, Select } from "antd";
import { useEffect, useState } from "react";

const SparePartsInput = ({ onSparePartsChange }) => {
  const [sparePart, setSparePart] = useState("");
  const [prefix, setPrefix] = useState("in");
  const [sparePartsList, setSparePartsList] = useState([]);

  const addSparePart = () => {
    if (sparePart.trim()) {
      const newPart = {
        type: prefix,
        name: sparePart,
      };
      setSparePartsList((prev) => [...prev, newPart]);
      setSparePart("");
    }
  };

  // Remove item from the list
  const removeSparePart = (index) => {
    const updatedList = sparePartsList.filter((_, i) => i !== index);
    setSparePartsList(updatedList);
  };

  // Effect to forward spare parts to parent component
  useEffect(() => {
    onSparePartsChange(sparePartsList);
  }, [sparePartsList, onSparePartsChange]);

  return (
    <div className="mb-5">
      <h5>Spare parts (In/Out)</h5>
      <div style={{ display: "flex", marginBottom: 16 }}>
        <Select
          defaultValue="in"
          style={{ width: 120, marginRight: 8 }}
          onChange={(value) => setPrefix(value)}
        >
          <Select.Option value="in">In</Select.Option>
          <Select.Option value="out">Out</Select.Option>
        </Select>

        <Input
          value={sparePart}
          placeholder="Enter spare part"
          onChange={(e) => setSparePart(e.target.value)}
          onBlur={addSparePart}
          onPressEnter={addSparePart}
          style={{ flex: 1, marginRight: 8 }}
        />

        <Button type="primary" onClick={addSparePart}>
          Add
        </Button>
      </div>

      <List
        bordered
        dataSource={sparePartsList}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <CloseOutlined
                key="close"
                onClick={() => removeSparePart(index)}
              />,
            ]}
          >
            {`${item.type} - ${item.name}`}
          </List.Item>
        )}
      />
    </div>
  );
};

export default SparePartsInput;
