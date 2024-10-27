import { Button, Divider, Form, Input, Modal } from "antd";
import { useState } from "react";
import PurchaseTable from "../../components/workshop/purchase-table";
import SparePartsCost from "../../components/workshop/spare-parts-cost";
import WorkingToolsCost from "../../components/workshop/working-tools-cost";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const Purchase = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSubmit = () => {
    // Handle form submission logic
    setIsModalVisible(false); // Close modal after submission
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <CustomLayout>
      <div className="flex items-center justify-between">
        <CustomHeader headerTitle={"Workshop Purchase"} />
        <Button type="primary" className=" text-white" onClick={showModal}>
          Add New Purchase
        </Button>
      </div>

      <Modal
        title="Purchase Details"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800} // Customize modal width if needed
      >
        <Form onFinish={handleSubmit} layout={"vertical"} form={form}>
          <Divider />
          <div className="grid grid-cols-2 gap-5">
            <SparePartsCost />
            <WorkingToolsCost />
          </div>

          {/* Scrub section */}
          <div className="mt-5 flex justify-between items-center">
            <h2>Scrub Cost</h2>
            <div className="mt-5">
              <Form.Item name={"scrub cost"}>
                <Input type="number" />
              </Form.Item>
            </div>
          </div>

          {/* Add Separator here */}

          <Divider orientation="left" />

          <Form.Item>
            <Button className="w-32" type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Table  */}
      <PurchaseTable />
    </CustomLayout>
  );
};

export default Purchase;
