import { Button, Divider, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import QuoteTable from "../components/quotes/quote-table";
import CustomHeader from "../core/custom-header";
import CustomModal from "../core/custom_modal";

const CreateQuote = () => {
  const [form] = Form.useForm();
  return (
    <div className="bg-white w-full h-full p-5 border border-gray-200 rounded-md">
      <CustomHeader headerTitle="Create Quotation" />
      {/* Quotation form */}
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
      >
        <div className="grid grid-cols-3 gap-3">
          <Form.Item label="Select">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date">
            <Input disabled placeholder="2024-12-31" />
          </Form.Item>
        </div>
        {/* Quotation form */}
        <div className="mt-5 grid grid-cols-3 gap-4">
          <TextArea className="col-span-2" placeholder="Remarks" rows={4} />
        </div>

        {/* Quotation form */}
        <div className="mt-10">
          <h2 className="text-lg font-w500 text-slate-900 mb-5">
            Quotation Details
          </h2>
          <QuoteTable />
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-3">
            <CustomModal header={"Add Quotation Details"} buttonTitle={"Add"}>
              <Divider />
              <Form layout="vertical">
                <div className="grid grid-cols-2 gap-3">
                  <Form.Item label="From">
                    <Input />
                  </Form.Item>
                  <Form.Item label="To">
                    <Input />
                  </Form.Item>
                </div>
                {/* Section two */}
                <h5 className="mb-3">Description</h5>
                <TextArea rows={4} />
                {/* ..... */}
                <div className="grid grid-cols-3 gap-3 mt-5">
                  <Form.Item label="Size">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Weight">
                    <Input />
                  </Form.Item>
                  <Form.Item label="ETA">
                    <Input />
                  </Form.Item>
                </div>
                {/* Section three */}
                <div className="grid grid-cols-2 gap-3">
                  <Form.Item label="Rate">
                    <Input />
                  </Form.Item>
                  <Form.Item label="Advance">
                    <Input />
                  </Form.Item>
                </div>
              </Form>
            </CustomModal>
            <Button type="default" htmlType="submit">
              Save
            </Button>
          </div>
          <div className="flex justify-end">
            <Button type="default" htmlType="submit">
              Return to dashboard
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default CreateQuote;
