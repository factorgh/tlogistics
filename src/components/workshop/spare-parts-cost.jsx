import { CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, List } from "antd";
import { useState } from "react";

const SparePartsCost = () => {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [sparePartsList, setSparePartsList] = useState([]);

  const addSparePart = () => {
    if (name.trim() && cost.trim()) {
      const newPart = { name, cost };
      setSparePartsList([...sparePartsList, newPart]);
      setName(""); // Clear inputs after adding
      setCost("");
    }
  };

  const removeSparePart = (index) => {
    const updatedList = sparePartsList.filter((_, i) => i !== index);
    setSparePartsList(updatedList);
  };

  return (
    <div className="mb-5">
      <Form.Item label="Spare Parts and Cost">
        <div style={{ display: "flex", marginBottom: 16 }}>
          <Input
            placeholder="Spare Part Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginRight: 8, flex: 1 }}
          />
          <Input
            placeholder="Cost"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            type="number"
            style={{ marginRight: 8, flex: 1 }}
          />
          <Button type="primary" onClick={addSparePart}>
            Add
          </Button>
        </div>
      </Form.Item>

      {/* List of spare parts */}
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
            {item.name} - {item.cost}
          </List.Item>
        )}
      />
    </div>
  );
};

export default SparePartsCost;
