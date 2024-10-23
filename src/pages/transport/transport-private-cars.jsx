import { Divider, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import ForkliftTable from "../../components/transport/forklift";
import TransportMcBerryTable from "../../components/transport/transport-mcberry";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";
import CustomModal from "../../core/custom_modal";

const TransportPrivateCars = () => {
  const [form] = Form.useForm();

  const handleSubmit = () => {};

  return (
    <CustomLayout>
      <div className="flex items-center justify-between ">
        <CustomHeader headerTitle={"Transport McBerry"} />
        <CustomModal
          buttonTitle={"Add Transport McBerry"}
          header="Add Transport McBerry"
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

      <TransportMcBerryTable />
      {/* Add Seperator here */}
      <Divider className="mt-8" />
      <div className="flex items-center justify-between ">
        <h5 className="text-2xl mb-3 font-sembold text-[#5F616E]">Forklit</h5>
        <CustomModal buttonTitle={"Add Forklit"} header="Add Forklit">
          <Form onFinish={handleSubmit} layout={"vertical"} form={form}>
            <div>
              <Divider />
              <div className="grid grid-cols-1 gap-2">
                <Form.Item label="Energy Type">
                  <Select>
                    <Select.Option value="gas">Gas</Select.Option>
                    <Select.Option value="diesel">Diesel</Select.Option>
                    <Select.Option value="electrical">Electrical</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Tonage" name={"tonage"}>
                  <Input />
                </Form.Item>
                <Form.Item label="Type">
                  <Select>
                    <Select.Option value="heli">Heli</Select.Option>
                    <Select.Option value="jac">Jac</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </div>
            {/* Add Seperator here */}
          </Form>
        </CustomModal>
      </div>
      <ForkliftTable />
    </CustomLayout>
  );
};

export default TransportPrivateCars;
