import { Button, Divider, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateVendorMutation,
  useGetVendorsQuery,
} from "../app/services/vendors/vendors";
import VendorListTable from "../components/vendor/vendor-list-table";
import CustomHeader from "../core/custom-header";
import ExportExcel from "../utils/excel-dowaloader";

const VendorsList = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createVendor, { isLoading, error }] = useCreateVendorMutation();
  const { data } = useGetVendorsQuery();
  console.log(data);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields(); // Clear form when closing
  };

  const handleSubmit = async (values) => {
    try {
      const response = await createVendor(values);

      if (response?.data) {
        form.resetFields();
        setIsModalOpen(false);
        toast.success("Vendor Created Successfully");
      } else {
        throw new Error("Vendor creation failed.");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(error?.data?.message || "Failed to create vendor.");
    }
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => handleSubmit(values))
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
      });
  };

  return (
    <div className="bg-white w-full h-full p-5 border border-gray-200 rounded-md">
      <div className="flex justify-between items-center">
        <CustomHeader headerTitle={"Vendors List"} />
        <div className="flex gap-3 items-center">
          <Button type="primary" onClick={showModal}>
            Add New Vendor
          </Button>
          <Modal
            title="Add Vendor"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Add"
            cancelText="Close"
            cancelButtonProps={{
              style: { backgroundColor: "#858796", color: "white" },
            }}
            confirmLoading={isLoading} // Show loading on OK button
          >
            <Form onFinish={handleSubmit} layout="vertical" form={form}>
              <Divider />
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter your name" }]}
              >
                <Input placeholder="Enter your name" />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input placeholder="Enter your email" />
              </Form.Item>

              <Form.Item
                label="Phone Number"
                name="phone"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}
              >
                <Input placeholder="Enter your phone number" />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: "Please enter your address" },
                ]}
              >
                <Input placeholder="Enter your address" />
              </Form.Item>

              <Form.Item
                label="Company"
                name="company"
                rules={[
                  { required: true, message: "Please enter your company name" },
                ]}
              >
                <Input placeholder="Enter your company name" />
              </Form.Item>

              <Form.Item label="Notes" name="notes">
                <TextArea placeholder="Additional notes" />
              </Form.Item>
            </Form>
          </Modal>

          <ExportExcel data={data?.vendors}>
            <h5>Excel</h5>
          </ExportExcel>
        </div>
      </div>

      {/* Vendor list table */}
      <VendorListTable />
    </div>
  );
};

export default VendorsList;
