import { Button, Form, Input, Modal } from "antd";
import { useState } from "react";
import PriceListTable from "../components/shipment/price-list-table";
import CustomHeader from "../core/custom-header";

const PriceList = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = (values) => {
    console.log("Received values from form: ", values);
    // Handle the form submission logic (e.g., sending to API)
    setIsModalVisible(false); // Close the modal after submission
    form.resetFields(); // Reset form fields
  };

  return (
    <div className="bg-white w-full h-full p-5 border border-gray-200 rounded-md">
      <div className="flex justify-between items-center">
        <CustomHeader headerTitle={"Price List"} />
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Add
        </Button>
      </div>

      {/* Price List Table */}
      <PriceListTable />

      {/* Ant Design Modal for Price List Form */}
      <Modal
        title="Add Price List"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null} // Set footer to null to use custom footer if needed
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="From"
            name="from"
            rules={[
              {
                required: true,
                message: "Please input the departure location!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="To"
            name="to"
            rules={[
              {
                required: true,
                message: "Please input the destination location!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="LCV"
            name="lcv"
            rules={[{ required: true, message: "Please input the LCV price!" }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="28Ft Open Truck"
            name="truck"
            rules={[
              { required: true, message: "Please input the truck price!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <div style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button
              style={{ margin: "0 8px" }}
              onClick={() => setIsModalVisible(false)}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default PriceList;
