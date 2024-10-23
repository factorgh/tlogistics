import { Button, Divider, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import MechanicTable from "../../components/workshop/mechanic-table";
import SparePartsInput from "../../components/workshop/spare-parts-input";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";
import CustomModal from "../../core/custom_modal";

const Mechanic = () => {
  const [form] = Form.useForm();

  const handleSubmit = () => {};

  return (
    <CustomLayout>
      <div className="flex items-center justify-between ">
        <CustomHeader headerTitle={"Workshop Mechanic"} />
        <div>
          <CustomModal
            buttonTitle={"Add Mechanic Summary"}
            header="Add Mechanic Summary"
          >
            <Form onFinish={handleSubmit} layout={"vertical"} form={form}>
              <div>
                <Divider />
                <div className="grid grid-cols-2 gap-3">
                  <Form.Item
                    label="Vehicle Maintenance"
                    name={"vehicle maintenance"}
                  >
                    <Input />
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
                <SparePartsInput />
                <Form.Item label="Ovehaul/Repair">
                  <Select>
                    <Select.Option value="repair">Repair</Select.Option>
                    <Select.Option value="overhaul">Overhaul</Select.Option>
                  </Select>
                </Form.Item>
                <div>
                  <h5 className="mb-3">Diagonistic Services</h5>
                  <TextArea rows={4} />
                </div>
                <div className="mt-3">
                  <h5 className="mb-3">BreakDown Response Team</h5>
                  <TextArea rows={4} />
                </div>
              </div>
              {/* Add Seperator here */}
            </Form>
          </CustomModal>
          <Button type="primary" className="bg-green-500 ml-3 text-white">
            Daily Report
          </Button>
        </div>
      </div>
      {/* Form section */}

      <MechanicTable />
    </CustomLayout>
  );
};

export default Mechanic;
