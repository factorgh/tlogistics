import { Button, Form, Input, InputNumber } from "antd";

const GeneralExpensesForm = () => {
  return (
    <Form layout="vertical" onFinish={(values) => console.log(values)}>
      {/* Road & Sleeping Expenses */}
      <Form.Item
        label="Road & Sleeping Expenses"
        name="roadSleepingExpenses"
        rules={[{ required: true }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          prefix="GHC"
          placeholder="Enter total expense amount"
        />
      </Form.Item>

      {/* Police Cases & Accidents */}
      <Form.Item
        label="Police Cases & Accidents"
        name="policeAccidents"
        rules={[{ required: true }]}
      >
        <Input.TextArea placeholder="Enter details of any police cases or accidents" />
      </Form.Item>

      {/* Save Button */}
      <Form.Item>
        <Button className="w-full" type="primary" htmlType="submit">
          Save Expenses
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GeneralExpensesForm;
