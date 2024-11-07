/* eslint-disable react/prop-types */
import { Button, Form, Input, InputNumber, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useCreateTransitMutation } from "../../../app/services/financial-assets/transit";

const TransitAndDemurrageForm = ({ onSubmit, initialValues }) => {
  const [form] = useForm();

  const [createTransit, { isLoading }] = useCreateTransitMutation();

  // Set the form values when initialValues changes
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleFormSubmit = async (values) => {
    try {
      await createTransit(values).unwrap();
      toast.success("Transit created successfully");

      onSubmit(); // Assuming this function handles closing the modal or other actions
      form.resetFields(); // Reset the form after successful submission
    } catch (error) {
      toast.error(error.data.message);
      onSubmit(); // Handle failure and close the modal or show error state
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFormSubmit}
      initialValues={initialValues || {}} // Ensure initialValues are passed correctly
    >
      {/* Job Details */}
      <Form.Item label="Job ID" name="job" rules={[{ required: true }]}>
        <Input placeholder="Enter Job ID" />
      </Form.Item>

      {/* Delay and Demurrage Charges */}
      <Form.Item
        label="Delay in Hours"
        name="delay_in_hour"
        rules={[{ required: true }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Enter delay in hours"
        />
      </Form.Item>

      <Form.Item
        label="Demurrage Charge per Hour"
        name="charge_per_hour"
        rules={[{ required: true }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          prefix="GHC"
          placeholder="Enter charge per hour"
        />
      </Form.Item>

      {/* Save Button */}
      <Form.Item>
        {isLoading ? (
          <Button className="w-full" htmlType="submit" disabled>
            <Spin />
          </Button>
        ) : (
          <Button type="primary" className="w-full" htmlType="submit">
            Save Demurrage Details
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default TransitAndDemurrageForm;
