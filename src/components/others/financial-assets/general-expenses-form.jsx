/* eslint-disable react/prop-types */
import { Button, Form, Input, InputNumber, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import { useCreateGeneralExpenseMutation } from "../../../app/services/financial-assets/general-expense";

const GeneralExpensesForm = ({ onSubmit }) => {
  const [createExpense, { isLoading }] = useCreateGeneralExpenseMutation();
  const form = useForm();

  const handleFormSubmit = async (values) => {
    try {
      await createExpense(values).unwrap();
      toast.success("Expense created successfully");
      form.resetFields();
      onSubmit();
    } catch (error) {
      toast.error(error.data.message);
      onSubmit();
    }
  };
  return (
    <Form layout="vertical" onFinish={handleFormSubmit}>
      {/* Road & Sleeping Expenses */}
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
        {isLoading ? (
          <Button className="w-full" htmlType="submit" disabled>
            <Spin />
          </Button>
        ) : (
          <Button type="primary" className="w-full" htmlType="submit">
            Save Expense
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default GeneralExpensesForm;
