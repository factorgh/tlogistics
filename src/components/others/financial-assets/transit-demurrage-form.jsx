import { Button, Form, Input, InputNumber, Modal, Spin } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateTransitMutation } from "../../../app/services/financial-assets/transit";

const TransitAndDemurrageModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createTransit, { isLoading }] = useCreateTransitMutation();
  const [form] = Form.useForm();

  // Open the modal
  const showModal = () => setIsModalVisible(true);

  // Close the modal
  const handleCancel = () => setIsModalVisible(false);

  // Handle form submit for creating transit
  const handleFormSubmit = async (values) => {
    try {
      await createTransit(values).unwrap();
      toast.success("Transit created successfully");
      setIsModalVisible(false); // Close the modal after successful creation
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      {/* Add Button to open modal */}
      <Button type="primary" onClick={showModal}>
        Add Transit Asset
      </Button>

      {/* Modal for Transit Form */}
      <Modal
        title="Add Transit Asset"
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
      </Modal>
    </div>
  );
};

export default TransitAndDemurrageModal;
