import { Button, DatePicker, Divider, Form, Input, Select } from "antd";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const Petrol = () => {
  const [form] = Form.useForm();
  const handleSubmit = () => {};
  return (
    <CustomLayout>
      <div className="flex items-center justify-between ">
        <CustomHeader headerTitle={"Petrol"} />
        <div>
          <h3 className="text-sm mb-3">
            Stock In Hand :<span className="text-blue-500"> 57,000 LTS </span>
            <Button type="primary" className="bg-green-500 text-white ml-3">
              Monthly Report
            </Button>
          </h3>
        </div>
      </div>
      {/* Petrol Form */}
      <Divider />
      {/* Petrol Table */}
      <div className="mt-5 ">
        <Form onFinish={handleSubmit} layout={"vertical"} form={form}>
          <div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Form.Item label="Vehicle No." name={"vehicle no."}>
                  <Input />
                </Form.Item>
                <Form.Item label="Consumption(Lts)" name={"consumption"}>
                  <Input type="number" />
                </Form.Item>
                <Form.Item label="Unit Price" name={"unit price"}>
                  <Input type="number" />
                </Form.Item>
                <Form.Item label="Amount" name={"amount"}>
                  <Input type="number" disabled />
                </Form.Item>
              </div>
              <div>
                <Form.Item label=" Date">
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Form.Item label="Select">
                  <Select defaultValue="pump1">
                    <Select.Option value="pump1">Pump 1</Select.Option>
                    <Select.Option value="pump2">Pump 2</Select.Option>
                  </Select>
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

            <div className="mt-5 flex items-center justify-between">
              <Button type="primary" htmlType="submit">
                Add Entry
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </CustomLayout>
  );
};

export default Petrol;
