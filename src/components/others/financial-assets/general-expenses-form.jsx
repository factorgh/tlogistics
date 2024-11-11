import { Button, Form, Input, InputNumber, Modal, Spin } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateGeneralExpenseMutation } from "../../../app/services/financial-assets/general-expense";

const GeneralExpensesModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createExpense, { isLoading }] = useCreateGeneralExpenseMutation();
  const [form] = Form.useForm();

  // Open the modal
  const showModal = () => setIsModalVisible(true);

  // Close the modal
  const handleCancel = () => setIsModalVisible(false);

  // Handle form submit for creating an expense
  const handleFormSubmit = async (values) => {
    try {
      await createExpense(values).unwrap();
      toast.success("Expense created successfully");
      setIsModalVisible(false); // Close the modal after successful creation
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      {/* Add Button to open modal */}
      <Button type="primary" onClick={showModal}>
        Add Expense
      </Button>

      {/* Modal for Expense Form */}
      <Modal
        title="Add Expense"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // Remove footer as we have custom buttons inside the form
        width={600} // Adjust width as needed
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={{}} // Ensure empty object if no initial values
        >
          <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
            <InputNumber
              style={{ width: "100%" }}
              prefix="GHC"
              placeholder="Enter total expense amount"
            />
          </Form.Item>

          <Form.Item
            label="Police Cases & Accidents"
            name="police_and_accident"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="Enter details of any police cases or accidents" />
          </Form.Item>

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
      </Modal>
    </div>
  );
};

export default GeneralExpensesModal;
