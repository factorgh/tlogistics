import { Button, Form, Input, Modal, Select, Spin } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateLogisticMutation } from "../../../app/services/financial-assets/logistics";

const LogisticAssetsModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createLogistics, { isLoading }] = useCreateLogisticMutation();
  const [form] = Form.useForm();

  // Open the modal
  const showModal = () => setIsModalVisible(true);

  // Close the modal
  const handleCancel = () => setIsModalVisible(false);

  // Handle form submit for creating an asset
  const handleFormSubmit = async (values) => {
    console.log(values);
    try {
      await createLogistics(values).unwrap();
      toast.success("Asset created successfully");
      setIsModalVisible(false); // Close the modal after successful creation
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred");
    }
  };

  return (
    <div>
      {/* Add Button to open modal */}
      <Button type="primary" onClick={showModal}>
        Add Logistic Asset
      </Button>

      {/* Modal for Asset Form */}
      <Modal
        title="Add Logistic Asset"
        open={isModalVisible}
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
          {/* Add Asset Type */}
          <Form.Item
            label="Asset Type"
            name="asset_type"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select Asset Type">
              <Select.Option value="vehicle">Vehicle</Select.Option>
              <Select.Option value="driver">Driver</Select.Option>
              <Select.Option value="warehouse">Warehouse</Select.Option>
            </Select>
          </Form.Item>

          {/* Add Asset Details */}
          <Form.Item
            label="Asset Details"
            name="details"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="Enter details of the asset (e.g., vehicle plate, driver name)" />
          </Form.Item>

          {/* Save Button */}
          <Form.Item>
            {isLoading ? (
              <Button className="w-full" htmlType="submit" disabled>
                <Spin />
              </Button>
            ) : (
              <Button type="primary" className="w-full" htmlType="submit">
                Save Asset
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LogisticAssetsModal;
