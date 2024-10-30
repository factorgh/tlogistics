import { Button, Divider, Form, Input, Modal, Select, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateTransportMutation } from "../../app/services/transport/transport";
import TransportBeverageTable from "../../components/transport/transport-beverage";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const TransportBeverage = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createTransportBeverage, { isLoading }] = useCreateTransportMutation();

  const handleSubmit = async (values) => {
    const formattedValues = {
      ...values,
      transport_type: "BEVERAGE",
    };
    console.log(formattedValues);

    try {
      await createTransportBeverage(formattedValues).unwrap();
      form.resetFields();
      toast.success("Transport Beverage Created Successfully");
    } catch (error) {
      toast.error(error.data.message);
    }
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
              <Form.Item label="Vehicle Number" name={"vehicle_number"}>
                <Input />
              </Form.Item>
              <Form.Item label="Vehicle Type" name={"vehicle_type"}>
                <Input />
              </Form.Item>
              <Form.Item label="Driver Management" name={"driver_management"}>
                <Select>
                  <Select.Option value="demo">Demo</Select.Option>
                  {/* Add more options as needed */}
                </Select>
              </Form.Item>

              <Form.Item label="Truck Assistant" name={"truck_assistant"}>
                <Input />
              </Form.Item>

              <Form.Item
                label="Registration Exp. Date"
                name={"registration_expiring_date"}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Insurance Exp. Date"
                name={"insurance_expiring_date"}
              >
                <Input />
              </Form.Item>
            </div>
            <h5>Route Optimization</h5>
            <Form.Item name="route_optimization" noStyle>
              <TextArea rows={4} />
            </Form.Item>
          </div>

          <div>
            {isLoading ? (
              <Button className="w-full mt-3" htmlType="submit">
                <Spin />
              </Button>
            ) : (
              <Button className="w-full mt-3" type="primary" htmlType="submit">
                Submit
              </Button>
            )}
          </div>
        </Form>
      </Modal>

      {/* Beverage Table Section */}
      <TransportBeverageTable />
    </CustomLayout>
  );
};

export default TransportBeverage;
