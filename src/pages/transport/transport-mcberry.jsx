import { Button, Divider, Form, Input, Modal, Select, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateTransportMutation } from "../../app/services/transport/transport";
import TransportMcBerryTable from "../../components/transport/transport-mcberry";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const TransportMcBerry = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createTransportMcBerry, { isLoading }] = useCreateTransportMutation();

  const handleSubmit = async (values) => {
    const formattedValues = {
      ...values,
      transport_type: "MCBERRY",
    };
    console.log(formattedValues); // Check if route_optimization is included

    try {
      await createTransportMcBerry(formattedValues).unwrap();
      form.resetFields();
      toast.success("Transport McBerry Created Successfully");
    } catch (error) {
      toast.error(error.data.message);
    }

    setIsModalVisible(false); // Close modal after submission
  };

  return (
    <CustomLayout>
      <div className="flex items-center justify-between ">
        <CustomHeader headerTitle={"Transport McBerry"} />
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Add Transport McBerry
        </Button>
      </div>

      {/* Ant Design Modal */}
      <Modal
        title="Add Transport McBerry"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleSubmit} layout={"vertical"} form={form}>
          <div>
            <Divider />
            <div className="grid grid-cols-2 gap-3">
              <Form.Item label="Vehicle Number" name="vehicle_number">
                <Input />
              </Form.Item>
              <Form.Item label="Vehicle Type" name="vehicle_type">
                <Input />
              </Form.Item>
              <Form.Item label="Driver Management" name="driver_management">
                <Select>
                  <Select.Option value="demo">Demo</Select.Option>
                  {/* Add more options as needed */}
                </Select>
              </Form.Item>

              <Form.Item label="Truck Assistant" name="truck_assistant">
                <Input />
              </Form.Item>

              <Form.Item
                label="Registration Exp. Date"
                name="registration_expiring_date"
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Insurance Exp. Date"
                name="insurance_expiring_date"
              >
                <Input />
              </Form.Item>
            </div>
            <div>
              <h5>Route Optimization</h5>
              <Form.Item name="route_optimization" noStyle>
                <TextArea rows={4} />
              </Form.Item>
            </div>
          </div>
          <div style={{ width: "100%" }}>
            {isLoading ? (
              <Button className="w-full mt-3" htmlType="submit" disabled>
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

      {/* Table Section */}
      <TransportMcBerryTable />
    </CustomLayout>
  );
};

export default TransportMcBerry;
