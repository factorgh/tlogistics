import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, InputNumber } from "antd";
import { useState } from "react";

const { RangePicker } = DatePicker;

const InsuranceForm = () => {
  const [claims, setClaims] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [refunds, setRefunds] = useState([]);

  // Add claim management
  const addClaim = () => {
    setClaims([...claims, { id: claims.length, description: "", amount: 0 }]);
  };

  // Add invoice management
  const addInvoice = () => {
    setInvoices([...invoices, { id: invoices.length, number: "", amount: 0 }]);
  };

  // Add refund management
  const addRefund = () => {
    setRefunds([...refunds, { id: refunds.length, chequeNo: "", amount: 0 }]);
  };

  return (
    <Form
      layout="vertical"
      onFinish={(values) => console.log("Form Values:", values)}
    >
      {/* Vehicle Insurance */}
      <Form.Item
        label="Vehicle Insurance Number"
        name="insuranceNumber"
        rules={[
          { required: true, message: "Please enter the insurance number!" },
        ]}
      >
        <Input placeholder="Enter Vehicle Insurance Number" />
      </Form.Item>

      {/* Insurer */}
      <Form.Item
        label="Insurer"
        name="insurer"
        rules={[{ required: true, message: "Please enter the insurer name!" }]}
      >
        <Input placeholder="Enter Insurer Name" />
      </Form.Item>

      {/* Starting & Expiry Date */}
      <Form.Item
        label="Insurance Period"
        name="insurancePeriod"
        rules={[
          {
            required: true,
            message: "Please select the start and expiry date!",
          },
        ]}
      >
        <RangePicker style={{ width: "100%" }} />
      </Form.Item>

      {/* Claims & Accident Tracker Management */}
      <Form.Item label="Claims & Accident Tracker Management">
        <Button type="dashed" onClick={addClaim} block icon={<PlusOutlined />}>
          Add Claim
        </Button>
        {claims.map((claim, index) => (
          <div
            key={index}
            style={{ display: "flex", gap: "10px", marginTop: "10px" }}
          >
            <Input placeholder="Claim Description" style={{ flex: 2 }} />
            <InputNumber placeholder="Amount" style={{ flex: 1 }} />
          </div>
        ))}
      </Form.Item>

      {/* Invoices */}
      <Form.Item label="Invoices">
        <Button
          type="dashed"
          onClick={addInvoice}
          block
          icon={<PlusOutlined />}
        >
          Add Invoice
        </Button>
        {invoices.map((invoice, index) => (
          <div
            key={index}
            style={{ display: "flex", gap: "10px", marginTop: "10px" }}
          >
            <Input placeholder="Invoice Number" style={{ flex: 1 }} />
            <InputNumber placeholder="Amount" style={{ flex: 1 }} />
          </div>
        ))}
      </Form.Item>

      {/* Refunds (Cheques) */}
      <Form.Item label="Refunds (Cheques)">
        <Button type="dashed" onClick={addRefund} block icon={<PlusOutlined />}>
          Add Refund
        </Button>
        {refunds.map((refund, index) => (
          <div
            key={index}
            style={{ display: "flex", gap: "10px", marginTop: "10px" }}
          >
            <Input placeholder="Cheque Number" style={{ flex: 1 }} />
            <InputNumber placeholder="Refund Amount" style={{ flex: 1 }} />
          </div>
        ))}
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <div className="">
          <Button className="w-full" type="primary" htmlType="submit" block>
            Submit
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default InsuranceForm;
