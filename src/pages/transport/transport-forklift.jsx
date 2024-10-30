import { Button, Divider, Form, Input, Modal, Select, Spin } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateForkliftMutation } from "../../app/services/transport/forklift";
import ForkliftTable from "../../components/transport/forklift";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const TransportForklift = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [createForklift, { isLoading }] = useCreateForkliftMutation();

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      await createForklift(values).unwrap();
      toast.success("Forklift Created Successfully");
    } catch (error) {
      toast.error(error.data?.message);
    }
    setIsModalVisible(false);
  };

  return (
    <CustomLayout>
      <div className="flex items-center justify-between">
        <CustomHeader headerTitle={"Transport Forklift"} />
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Add ForkLift
        </Button>
      </div>

      {/* Ant Design Modal for Transport Beverages */}
      <Modal
        title="Add Forklift"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleSubmit} layout="vertical" form={form}>
          <Divider />
          <div className="grid grid-cols-1 gap-2">
            <Form.Item
              label="Energy Type"
              name="energy_type" // Changed from "energy type" to "energy_type"
              rules={[{ required: true, message: "Please select energy type" }]} // Added validation rule
            >
              <Select>
                <Select.Option value="gas">Gas</Select.Option>
                <Select.Option value="diesel">Diesel</Select.Option>
                <Select.Option value="electrical">Electrical</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Tonnage"
              name="tonnage"
              rules={[{ required: true, message: "Please enter tonnage" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Type"
              name="type"
              rules={[{ required: true, message: "Please select a type" }]}
            >
              <Select>
                <Select.Option value="heli">Heli</Select.Option>
                <Select.Option value="jac">Jac</Select.Option>
              </Select>
            </Form.Item>
          </div>
          <div style={{ textAlign: "right" }}>
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
      <ForkliftTable />
    </CustomLayout>
  );
};

export default TransportForklift;
