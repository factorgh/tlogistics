import { Button, Divider, Form, Input } from "antd";
import SparePartsCost from "../../components/workshop/spare-parts-cost";
import WorkingToolsCost from "../../components/workshop/working-tools-cost";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const Purchase = () => {
  const [form] = Form.useForm();

  const handleSubmit = () => {};

  return (
    <CustomLayout>
      <div className="flex items-center justify-between ">
        <CustomHeader headerTitle={"Workshop Purchase"} />
        <Button className="bg-green-500 text-white">Monthly Reports</Button>
      </div>
      <Form onFinish={handleSubmit} layout={"vertical"} form={form}>
        <div>
          <Divider />
          <div className="grid grid-cols-2 gap-5">
            <SparePartsCost />
            <WorkingToolsCost />
          </div>
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

        {/* Add Seperator here */}
        <div className="mt-5 flex justify-between items-center">
          <h2>Total Expenses</h2>
          <div className="mt-5">Total Cost: $5,000</div>
        </div>
        <div>
          <Divider orientation="left" />
          <div className="text-left">
            <Form.Item>
              <Button className="w-32" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>

      {/* Form section */}
    </CustomLayout>
  );
};

export default Purchase;
