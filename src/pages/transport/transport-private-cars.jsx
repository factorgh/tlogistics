import { Button, Divider, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import ForkliftTable from "../../components/transport/forklift";
import TransportMcBerryTable from "../../components/transport/transport-mcberry";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const TransportPrivateCars = () => {
  const [formPrivateCars] = Form.useForm();
  const [formForklift] = Form.useForm();
  const [isPrivateCarsModalVisible, setIsPrivateCarsModalVisible] =
    useState(false);
  const [isForkliftModalVisible, setIsForkliftModalVisible] = useState(false);

  const handleSubmitPrivateCars = () => {
    // Handle form submission logic for Transport Private Cars
    setIsPrivateCarsModalVisible(false); // Close modal after submission
  };

  const handleSubmitForklift = () => {
    // Handle form submission logic for Forklift
    setIsForkliftModalVisible(false); // Close modal after submission
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
          <div style={{ textAlign: "right" }}>
            <Button className="w-full mt-3" type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Table Section */}
      <TransportMcBerryTable />

      {/* Separator */}
      <Divider className="mt-8" />

      <div className="flex items-center justify-between ">
        <h5 className="text-2xl mb-3 font-sembold text-[#5F616E]">Forklift</h5>
        <Button type="primary" onClick={() => setIsForkliftModalVisible(true)}>
          Add Forklift
        </Button>
      </div>

      {/* Ant Design Modal for Forklift */}
      <Modal
        title="Add Forklift"
        visible={isForkliftModalVisible}
        onCancel={() => setIsForkliftModalVisible(false)}
        footer={null} // Set footer to null to use custom footer if needed
      >
        <Form
          onFinish={handleSubmitForklift}
          layout={"vertical"}
          form={formForklift}
        >
          <div>
            <Divider />
            <div className="grid grid-cols-1 gap-2">
              <Form.Item label="Energy Type" name={"energy type"}>
                <Select>
                  <Select.Option value="gas">Gas</Select.Option>
                  <Select.Option value="diesel">Diesel</Select.Option>
                  <Select.Option value="electrical">Electrical</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Tonage" name={"tonage"}>
                <Input />
              </Form.Item>
              <Form.Item label="Type" name={"type"}>
                <Select>
                  <Select.Option value="heli">Heli</Select.Option>
                  <Select.Option value="jac">Jac</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <Button className="w-full mt-3" type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Forklift Table */}
      <ForkliftTable />
    </CustomLayout>
  );
};

export default TransportPrivateCars;
