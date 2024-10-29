/* eslint-disable react/prop-types */
import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, InputNumber, Spin } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateInsuranceMutation } from "../../app/services/insurance/insurance";

const InsuranceForm = ({ onSubmit }) => {
  const [claims, setClaims] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [refunds, setRefunds] = useState([]);
  const [createInusrance, { isLoading }] = useCreateInsuranceMutation();

  const addClaim = () => {
    setClaims([...claims, { id: claims.length, description: "", amount: 0 }]);
  };

  const addInvoice = () => {
    setInvoices([...invoices, { id: invoices.length, number: "", amount: 0 }]);
  };

  const addRefund = () => {
    setRefunds([...refunds, { id: refunds.length, chequeNo: "", amount: 0 }]);
  };

  const handleClaimChange = (index, field, value) => {
    const newClaims = [...claims];
    newClaims[index][field] = value;
    setClaims(newClaims);
  };

  const handleInvoiceChange = (index, field, value) => {
    const newInvoices = [...invoices];
    newInvoices[index][field] = value;
    setInvoices(newInvoices);
  };

  const handleRefundChange = (index, field, value) => {
    const newRefunds = [...refunds];
    newRefunds[index][field] = value;
    setRefunds(newRefunds);
  };

  const handleFinishEvent = async (values) => {
    const formattedValues = {
      insurer: values.insurer,

      start_date: values.start_date.$d,
      end_date: values.end_date.$d,
      claims,
      invoices,
      refunds,
    };
    console.log("Formatted Form Values:", formattedValues);
    try {
      await createInusrance(formattedValues).unwrap();
      toast.success("Insurance created successfully");
      onSubmit();
    } catch (error) {
      toast.error(error.data.message);
      onSubmit();
    }
  };

  return (
    <Form layout="vertical" onFinish={handleFinishEvent}>
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
        label="Start Date"
        name="start_date"
        rules={[{ required: true, message: "Please select the start date!" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>
      <Form.Item
        label="End Date"
        name="end_date"
        rules={[{ required: true, message: "Please select the expiry date!" }]}
      >
        <DatePicker style={{ width: "100%" }} />
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
            <Form.Item
              style={{ flex: 2 }}
              name={`claimDescription${index}`}
              rules={[
                { required: true, message: "Please enter a description!" },
              ]}
            >
              <Input
                placeholder="Claim Description"
                value={claim.description}
                onChange={(e) =>
                  handleClaimChange(index, "description", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item
              style={{ flex: 1 }}
              name={`claimAmount${index}`}
              rules={[{ required: true, message: "Please enter an amount!" }]}
            >
              <InputNumber
                placeholder="Amount"
                value={claim.amount}
                onChange={(value) => handleClaimChange(index, "amount", value)}
              />
            </Form.Item>
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
            <Form.Item
              style={{ flex: 1 }}
              name={`invoiceNumber${index}`}
              rules={[
                { required: true, message: "Please enter the invoice number!" },
              ]}
            >
              <Input
                placeholder="Invoice Number"
                value={invoice.number}
                onChange={(e) =>
                  handleInvoiceChange(index, "number", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item
              style={{ flex: 1 }}
              name={`invoiceAmount${index}`}
              rules={[{ required: true, message: "Please enter an amount!" }]}
            >
              <InputNumber
                placeholder="Amount"
                value={invoice.amount}
                onChange={(value) =>
                  handleInvoiceChange(index, "amount", value)
                }
              />
            </Form.Item>
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
            <Form.Item
              style={{ flex: 1 }}
              name={`refundCheque${index}`}
              rules={[
                { required: true, message: "Please enter a cheque number!" },
              ]}
            >
              <Input
                placeholder="Cheque Number"
                value={refund.chequeNo}
                onChange={(e) =>
                  handleRefundChange(index, "chequeNo", e.target.value)
                }
              />
            </Form.Item>
            <Form.Item
              style={{ flex: 1 }}
              name={`refundAmount${index}`}
              rules={[
                { required: true, message: "Please enter a refund amount!" },
              ]}
            >
              <InputNumber
                placeholder="Refund Amount"
                value={refund.amount}
                onChange={(value) => handleRefundChange(index, "amount", value)}
              />
            </Form.Item>
          </div>
        ))}
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        {isLoading ? (
          <Button className="w-full" htmlType="submit">
            <Spin />
          </Button>
        ) : (
          <Button className="w-full" type="primary" htmlType="submit">
            Submit
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default InsuranceForm;
