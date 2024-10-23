import { Divider, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import TransportBeverageTable from "../../components/transport/transport-beverage";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";
import CustomModal from "../../core/custom_modal";

const TransportBeverage = () => {
  const [form] = Form.useForm();

  const handleSubmit = () => {};

  return (
    <CustomLayout>
      <div className="flex items-center justify-between ">
        <CustomHeader headerTitle={"Transport Beverages"} />
        <CustomModal
          buttonTitle={"Add Transport Beverages"}
          header="Add Transport Beverages"
        >
          <Form onFinish={handleSubmit} layout={"vertical"} form={form}>
            <div>
              <Divider />
              <div className="grid grid-cols-2 gap-3">
                <Form.Item label="Vehicle Number" name={"vehicle number"}>
                  <Input />
                </Form.Item>
                <Form.Item label="Vehicle Type" name={"vehicle type"}>
                  <Input />
                </Form.Item>
                <Form.Item label="Driver Management">
                  <Select>
                    <Select.Option value="demo">Demo</Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Truck Assisstant" name={"truck assisstant"}>
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Registration Ex.Date"
                  name={" registration expiry date"}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Insurance Ex.Date"
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
            {/* Add Seperator here */}
          </Form>
        </CustomModal>
      </div>
      {/* Form section */}

      <TransportBeverageTable />
    </CustomLayout>
  );
};

export default TransportBeverage;
