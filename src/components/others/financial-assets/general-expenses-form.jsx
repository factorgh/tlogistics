/* eslint-disable react/prop-types */
import { Button, Form, Input, InputNumber, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {
  useCreateGeneralExpenseMutation,
  useUpdateGeneralExpenseMutation,
} from "../../../app/services/financial-assets/general-expense";

const GeneralExpensesForm = ({ onSubmit, initialValues }) => {
  const [createExpense, { isLoading: isCreating }] =
    useCreateGeneralExpenseMutation();
  const [updateExpense, { isLoading: isUpdating }] =
    useUpdateGeneralExpenseMutation(); // Assuming this mutation exists
  const form = useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues); // Prepopulate the form if editing
    }
  }, [initialValues, form]);

  const handleFormSubmit = async (values) => {
    try {
      if (initialValues) {
        // If initialValues exist, perform update
        await updateExpense({ id: initialValues.id, ...values }).unwrap();
        toast.success("Expense updated successfully");
      } else {
        // Otherwise, perform create
        await createExpense(values).unwrap();
        toast.success("Expense created successfully");
      }

      form.resetFields(); // Reset form after submission
      onSubmit(); // Close modal or do additional actions after success
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred");
      onSubmit(); // Close modal or do additional actions after failure
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFormSubmit}
      initialValues={initialValues || {}} // Ensure empty object if no initialValues
    >
      {/* Amount */}
      <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
        <InputNumber
          style={{ width: "100%" }}
          prefix="GHC"
          placeholder="Enter total expense amount"
        />
      </Form.Item>

      {/* Police Cases & Accidents */}
      <Form.Item
        label="Police Cases & Accidents"
        name="police_and_accident"
        rules={[{ required: true }]}
      >
        <Input.TextArea placeholder="Enter details of any police cases or accidents" />
      </Form.Item>

      {/* Save Button */}
      <Form.Item>
        {isCreating || isUpdating ? (
          <Button className="w-full" htmlType="submit" disabled>
            <Spin />
          </Button>
        ) : (
          <Button type="primary" className="w-full" htmlType="submit">
            {initialValues ? "Update Expense" : "Save Expense"}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default GeneralExpensesForm;
