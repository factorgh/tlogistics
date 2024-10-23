import { Button, Divider, Form, Input, Switch } from "antd";
import TextArea from "antd/es/input/TextArea";
const CreateCustomerForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = () => {};
  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };
  return (
    <Form onFinish={handleSubmit} layout={"vertical"} form={form}>
      <div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Form.Item label="Email" name={"email"}>
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item label="Name" name={"name"}>
              <Input placeholder="Enter your name" />
            </Form.Item>
            <Form.Item label="GSTNo" name={"gstNo"}>
              <Input placeholder="Enter your GSTNo" />
            </Form.Item>
          </div>
          <div>
            <Form.Item label="Password" name={"password"}>
              <Input placeholder="Enter your password" />
            </Form.Item>
            <Form.Item label="Company" name={"company"}>
              <Input placeholder="Enter your company" />
            </Form.Item>
            <Form.Item label="Phone Number" name={"phoneNumber"}>
              <Input placeholder="Enter your phone number" />
            </Form.Item>
          </div>
        </div>
        {/* Add Seperator here */}
        <Divider />
        <div className="mt-5 grid grid-cols-2 items-center gap-5">
          <Form.Item label="Pincode" name={"pincode"}>
            <Input placeholder="Enter pincode to get address" />
          </Form.Item>
          <div className="flex  justify-end pr-10">
            <div className="flex flex-col">
              <h5 className="text-md font-bold">Show Rates</h5>
              <Switch defaultChecked onChange={onChange} />
            </div>
          </div>
        </div>
        <Divider />
        <div className="mt-5 grid grid-cols-2 items-center gap-5">
          <TextArea rows={4} placeholder="Address" />

          <TextArea
            rows={4}
            placeholder="User Notes - For internal use only"
            maxLength={6}
          />
        </div>
        <div className="mt-5 flex items-center justify-between">
          <Button type="primary" size="large" htmlType="submit">
            Add Customer
          </Button>
        </div>
      </div>
    </Form>
  );
};
export default CreateCustomerForm;
