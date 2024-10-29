/* eslint-disable react/prop-types */
import { Button, Form, Input, Select, Spin } from "antd";
import { toast } from "react-toastify";
import { useCreateLogisticMutation } from "../../../app/services/financial-assets/logistics";

const LogisticAssetsForm = ({ onSubmit }) => {
  const [createLogistics, { isLoading }] = useCreateLogisticMutation();

  const [form] = Form.useForm();

  const handleFormSubmit = async (values) => {
    try {
      await createLogistics(values).unwrap();
      toast.success("Asset created successfully");
      // Reset form after successful submission
      form.resetFields();

      onSubmit();
    } catch (error) {
      toast.error(error.data.message);
      onSubmit();
    }
  };

  return (
    <Form layout="vertical" onFinish={handleFormSubmit}>
      {/* Add Asset */}
      <Form.Item
        label="Asset Type"
        name="asset_type"
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
        name="details"
        rules={[{ required: true }]}
      >
        <Input.TextArea placeholder="Enter details of the asset (e.g., vehicle plate, driver name)" />
      </Form.Item>

      {/* Save Button */}
      <Form.Item>
        {isLoading ? (
          <Button className="w-full" htmlType="submit" disabled>
            <Spin />
          </Button>
        ) : (
          <Button type="primary" className="w-full" htmlType="submit">
            Save Asset
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default LogisticAssetsForm;
