import { Button, Divider, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateCustomerMutation } from "../app/services/customer/customer";
import CustomerListTable from "../components/customer/customer-list";
import CustomHeader from "../core/custom-header";

const StaffList = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createCustomer, { isLoading, error }] = useCreateCustomerMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (values) => {
    try {
      const response = await createCustomer(values).unwrap();
      console.log(response);
      form.resetFields();
      setIsModalOpen(false);
      toast.success("Customer Created Successfully");
    } catch (err) {
      console.log(err);
      toast.error(error?.data?.message);
    }

    console.log("Form Values:", values);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        handleSubmit(values);
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
      });
  };

  return (
    <div className="bg-white w-full h-full p-5 border border-gray-200 rounded-md">
      <div className="flex items-center justify-between mb-3">
        <CustomHeader headerTitle="Customer List" />
        <>
          <Button type="primary" onClick={showModal} className="mb-3">
            Add Customer
          </Button>
          <Modal
            title={"Add New Customer"}
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Add"
            cancelText="Close"
            cancelButtonProps={{
              style: { backgroundColor: "#858796", color: "white" },
            }}
            confirmLoading={isLoading}
          >
            <Form onFinish={handleSubmit} layout={"vertical"} form={form}>
              <Divider />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Form.Item
                    rules={[
                      { required: true, message: "Please enter your name" },
                    ]}
                    label="Name"
                    name={"name"}
                  >
                    <Input placeholder="Enter your name" />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      { required: true, message: "Please enter your email" },
                    ]}
                    label="Email"
                    name={"email"}
                  >
                    <Input placeholder="Enter your email" />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    rules={[
                      { required: true, message: "Please enter your phone" },
                    ]}
                    label="Phone"
                    name={"phone"}
                  >
                    <Input placeholder="Enter your phone" />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      { required: true, message: "Please enter your address" },
                    ]}
                    label="Address"
                    name={"address"}
                  >
                    <Input placeholder="Enter your address" />
                  </Form.Item>
                </div>
              </div>
              {/* Add Seperator here */}
              <Divider />

              <Divider />
              <div className="mt-5 ">
                <h3 className="text-md">Notes</h3>
                <TextArea
                  rows={4}
                  placeholder="User Notes - For internal use only"
                />
              </div>
            </Form>
          </Modal>
        </>
      </div>

      <div>
        <CustomerListTable />
      </div>
    </div>
  );
};

export default StaffList;
