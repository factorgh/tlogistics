/* eslint-disable react/prop-types */
import { Button, Form, Input, Select, Spin } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  useCreateLogisticMutation,
  useUpdateLogisticMutation,
} from "../../../app/services/financial-assets/logistics";

const LogisticAssetsForm = ({ onSubmit, initialValues }) => {
  const [createLogistics, { isLoading: isCreating }] =
    useCreateLogisticMutation();
  const [updateLogistics, { isLoading: isUpdating }] =
    useUpdateLogisticMutation(); // Assuming this is defined
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues); // Prepopulate form with initialValues if in edit mode
    }
  }, [initialValues, form]);

  const handleFormSubmit = async (values) => {
    try {
      // If we have initialValues, we're editing, otherwise we're creating
      if (initialValues) {
        // Update existing logistic asset
        await updateLogistics({ id: initialValues.id, ...values }).unwrap(); // Pass the ID and other form values for update
        toast.success("Asset updated successfully");
      } else {
        // Create new logistic asset
        await createLogistics(values).unwrap();
        toast.success("Asset created successfully");
      }

      form.resetFields();
      onSubmit();
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred");
      onSubmit(); // Close modal or trigger any additional error handling
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
      {/* Add Asset Type */}
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

      {/* Add Asset Details */}
      <Form.Item
        label="Asset Details"
        name="details"
        rules={[{ required: true }]}
      >
        <Input.TextArea placeholder="Enter details of the asset (e.g., vehicle plate, driver name)" />
      </Form.Item>

      {/* Save Button */}
      <Form.Item>
        {isCreating || isUpdating ? (
          <Button className="w-full" htmlType="submit" disabled>
            <Spin />
          </Button>
        ) : (
          <Button type="primary" className="w-full" htmlType="submit">
            {initialValues ? "Update Asset" : "Save Asset"}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default LogisticAssetsForm;
