import { Button, DatePicker, Divider, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateStaffMutation } from "../app/services/staff/staff";
import StaffListTable from "../components/staff/staff-list-table";
import CustomHeader from "../core/custom-header";

const StaffList = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createStaff, { isLoading, error }] = useCreateStaffMutation();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    const formattedValues = {
      ...values,
      start_date: values.start_date.$d,
    };
    // Send data to endpoint
    try {
      const response = await createStaff(formattedValues);
      console.log(response);
      form.resetFields();
      setIsModalOpen(false);
      toast.success("Staff Created Successfully");
    } catch (err) {
      console.log(err);
      toast.error(error?.data?.message);
    }

    console.log("Form Values:", formattedValues);
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
        <CustomHeader headerTitle="Staff List" />
        <>
          <Button type="primary" onClick={showModal} className="mb-3">
            Add Staff
          </Button>
          <Modal
            title={"Add Staff"}
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
              <div>
                <Divider />
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Form.Item
                      label="Name"
                      name="name"
                      rules={[
                        { required: true, message: "Please enter your name" },
                      ]}
                    >
                      <Input placeholder="Enter your name" />
                    </Form.Item>
                    <Form.Item label="Select Position" name="position">
                      <Select defaultValue="admin">
                        <Select.Option value="admin">Admin</Select.Option>
                        <Select.Option value="employee">Employee</Select.Option>
                        <Select.Option value="transport">
                          Transport Manager
                        </Select.Option>
                        <Select.Option value="warehouse">
                          Warehouse Manager
                        </Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Starting Date"
                      name="start_date"
                      rules={[
                        { required: true, message: "Please select a date" },
                      ]}
                    >
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                    <Form.Item
                      label="Username"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your username",
                        },
                      ]}
                    >
                      <Input placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                      label="Emergency Name"
                      name="emergency_name"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your emergency name",
                        },
                      ]}
                    >
                      <Input placeholder="Emergency Name" />
                    </Form.Item>
                    <Form.Item
                      label="Emergency Number"
                      name="emergency_number"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your emergency number",
                        },
                      ]}
                    >
                      <Input placeholder="Emergency number" />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: "Please enter your email" },
                      ]}
                    >
                      <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item
                      label="ID Card Number"
                      name="id_card_number"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your ID card number",
                        },
                      ]}
                    >
                      <Input placeholder="ID Card Number" />
                    </Form.Item>
                    <Form.Item
                      label="ID Card Type"
                      name="id_card_type"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your ID card type",
                        },
                      ]}
                    >
                      <Input placeholder="ID Card Type" />
                    </Form.Item>
                    <Form.Item
                      label="Phone Number"
                      name="phone"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your phone number",
                        },
                      ]}
                    >
                      <Input placeholder="Phone Number" />
                    </Form.Item>
                    <Form.Item
                      label="Employee Address"
                      name="employee_address"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your address",
                        },
                      ]}
                    >
                      <Input placeholder="Employee Address" />
                    </Form.Item>
                    <Form.Item
                      label="Status"
                      name="status"
                      rules={[
                        { required: true, message: "Please enter your status" },
                      ]}
                    >
                      <Input placeholder="Status" />
                    </Form.Item>
                  </div>
                </div>
              </div>
              {/* {isLoading && (
                <div style={{ textAlign: "center", marginTop: 20 }}>
                  <Spin />
                </div>
              )} */}
            </Form>
          </Modal>
        </>
      </div>

      <div>
        <StaffListTable />
      </div>
    </div>
  );
};

export default StaffList;
