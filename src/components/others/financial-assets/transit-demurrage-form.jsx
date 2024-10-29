/* eslint-disable react/prop-types */
import { Button, Form, Input, InputNumber, Spin } from "antd";
import { useForm } from "antd/es/form/Form";
import { toast } from "react-toastify";
import { useCreateTransitMutation } from "../../../app/services/financial-assets/transit";

const TransitAndDemurrageForm = ({ onSubmit }) => {
  const form = useForm();

  const [createTransit, { isLoading }] = useCreateTransitMutation();

  const handleFormSubmit = async (values) => {
    try {
      await createTransit(values).unwrap();
      toast.success("Transit created successfully");

      onSubmit();
      form.resetFields();
    } catch (error) {
      toast.error(error.data.message);
      onSubmit();
    }
  };

  return (
    <Form layout="vertical" onFinish={handleFormSubmit}>
      {/* Job Details */}
      <Form.Item label="Job ID" name="job" rules={[{ required: true }]}>
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

      {/* Total Charges */}
      {/* <Form.Item
        label="Total Demurrage Charge"
        name="totalDemurrageCharge"
        rules={[{ required: true }]}
      >
        <InputNumber
          style={{ width: "100%" }}
          prefix="GHC"
          placeholder="Total demurrage charge"
          disabled
        />
      </Form.Item> */}

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
