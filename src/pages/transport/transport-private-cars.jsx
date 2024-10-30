import { Button, Divider, Form, Input, Modal, Select, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";

import { toast } from "react-toastify";
import { useCreateTransportMutation } from "../../app/services/transport/transport";
import TransportPrivateTable from "../../components/transport/transport-private-cars";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const TransportPrivateCars = () => {
  const [formPrivateCars] = Form.useForm();

  const [isPrivateCarsModalVisible, setIsPrivateCarsModalVisible] =
    useState(false);
  const [createTransportPrivateCars, { isLoading }] =
    useCreateTransportMutation();

  const handleSubmitPrivateCars = async (values) => {
    console.log(values);
    const formattedValues = {
      ...values,
      transport_type: "PRIVATE CARS",
    };
    console.log(formattedValues);
    try {
      await createTransportPrivateCars(formattedValues).unwrap();
      formPrivateCars.resetFields();
      toast.success("Transport Private Cars Created Successfully");
    } catch (error) {
      toast.error(error.data?.message);
    }
    setIsPrivateCarsModalVisible(false);
  };

  return (
    <CustomLayout>
      <div className="flex items-center justify-between ">
        <CustomHeader headerTitle={"Transport Private Cars"} />
        <Button
          type="primary"
          onClick={() => setIsPrivateCarsModalVisible(true)}
        >
          Add Transport Private Cars
        </Button>
      </div>

      {/* Ant Design Modal for Transport Private Cars */}
      <Modal
        title="Add Transport Private Cars"
        visible={isPrivateCarsModalVisible}
        onCancel={() => setIsPrivateCarsModalVisible(false)}
        footer={null} // Set footer to null to use custom footer if needed
      >
        <Form
          onFinish={handleSubmitPrivateCars}
          layout={"vertical"}
          form={formPrivateCars}
        >
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

          <div style={{ textAlign: "right" }}>
            {isLoading ? (
              <Button className="w-full mt-3" htmlType="submit">
                <Spin />
              </Button>
            ) : (
              <Button
                className="w-full text-white mt-3"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            )}
          </div>
        </Form>
      </Modal>

      {/* Table Section */}
      <TransportPrivateTable />

      {/* Separator */}
      <Divider className="mt-8" />
    </CustomLayout>
  );
};

export default TransportPrivateCars;
