import { Button, Form, Input, Select } from "antd";

const LogisticAssetsForm = () => {
  return (
    <Form layout="vertical" onFinish={(values) => console.log(values)}>
      {/* Add Asset */}
      <Form.Item
        label="Asset Type"
        name="assetType"
        rules={[{ required: true }]}
      >
        <Select placeholder="Select Asset Type">
          <Select.Option value="vehicle">Vehicle</Select.Option>
          <Select.Option value="driver">Driver</Select.Option>
          <Select.Option value="warehouse">Warehouse</Select.Option>
        </Select>
      </Form.Item>

      {/* Add Asset Details (Dynamic) */}
      <Form.Item
        label="Asset Details"
        name="assetDetails"
        rules={[{ required: true }]}
      >
        <Input.TextArea placeholder="Enter details of the asset (e.g., vehicle plate, driver name)" />
      </Form.Item>

      {/* Save Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Asset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LogisticAssetsForm;
