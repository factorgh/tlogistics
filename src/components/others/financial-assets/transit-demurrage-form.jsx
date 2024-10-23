import { Button, Form, Input, InputNumber } from "antd";

const TransitAndDemurrageForm = () => {
  return (
    <Form layout="vertical" onFinish={(values) => console.log(values)}>
      {/* Job Details */}
      <Form.Item label="Job ID" name="jobId" rules={[{ required: true }]}>
        <Input placeholder="Enter Job ID" />
      </Form.Item>

      {/* Transit Dates */}
      {/* <Form.Item
        label="Transit Dates"
        name="transitDates"
        rules={[{ required: true }]}
      >
        <RangePicker style={{ width: "100%" }} />
      </Form.Item> */}

      {/* Delay and Demurrage Charges */}
      <Form.Item
        label="Delay in Hours"
        name="delayHours"
        rules={[{ required: true }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          placeholder="Enter delay in hours"
        />
      </Form.Item>

      <Form.Item
        label="Demurrage Charge per Hour"
        name="demurrageCharge"
        rules={[{ required: true }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          prefix="$"
          placeholder="Enter charge per hour"
        />
      </Form.Item>

      {/* Total Charges */}
      <Form.Item
        label="Total Demurrage Charge"
        name="totalDemurrageCharge"
        rules={[{ required: true }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          prefix="$"
          placeholder="Total demurrage charge"
          disabled
        />
      </Form.Item>

      {/* Save Button */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Save Demurrage Details
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TransitAndDemurrageForm;
