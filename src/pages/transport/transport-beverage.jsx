import { Button, Divider, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import TransportBeverageTable from "../../components/transport/transport-beverage";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const TransportBeverage = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = () => {
    // Handle form submission logic
    setIsModalVisible(false); // Close modal after submission
  };

  return (
    <CustomLayout>
      <div className="flex items-center justify-between ">
        <CustomHeader headerTitle={"Transport Beverages"} />
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Add Transport Beverages
        </Button>
      </div>

      {/* Ant Design Modal for Transport Beverages */}
      <Modal
        title="Add Transport Beverages"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null} // Set footer to null to use custom footer if needed
      >
        <Form onFinish={handleSubmit} layout={"vertical"} form={form}>
          <div>
            <Divider />
            <div className="grid grid-cols-2 gap-3">
              <Form.Item
                defaultValue="BEVERAGE"
                label="Transport Type"
                name={"transport_type"}
              >
                <Input disabled />
              </Form.Item>
              <Form.Item label="Vehicle Number" name={"vehicle number"}>
                <Input />
              </Form.Item>
              <Form.Item label="Vehicle Type" name={"vehicle type"}>
                <Input />
              </Form.Item>
              <Form.Item label="Driver Management" name={"driver management"}>
                <Select>
                  <Select.Option value="demo">Demo</Select.Option>
                  {/* Add more options as needed */}
                </Select>
              </Form.Item>

              <Form.Item label="Truck Assistant" name={"truck assistant"}>
                <Input />
              </Form.Item>

              <Form.Item
                label="Registration Exp. Date"
                name={"registration expiry date"}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Insurance Exp. Date"
                name={"insurance expiry date"}
              >
                <Input />
              </Form.Item>
            </div>
            <div>
              <h5>Route Optimization</h5>
              <TextArea rows={4} />
            </div>
          </div>
          <div>
            <Button className="w-full mt-3" type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Beverage Table Section */}
      <TransportBeverageTable />
    </CustomLayout>
  );
};

export default TransportBeverage;
