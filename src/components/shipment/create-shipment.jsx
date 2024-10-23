import { Button, DatePicker, Divider, Form, Input, Radio, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import CreatePackagesTable from "./create-packages-table";
const CreateShipmentForm = () => {
  const [form] = Form.useForm();

  const handleSubmit = () => {};

  return (
    <Form onFinish={handleSubmit} layout={"vertical"} form={form}>
      <div>
        <div className="grid grid-cols-3 gap-3">
          <Form.Item label="Shipment Date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item label="Expected Delivery Date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <div className="mt-5 grid grid-cols-3 items-center gap-5">
          <Form.Item label="Send Info">
            <Select style={{ width: "100%" }}>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Receiver Info">
            <Select style={{ width: "100%" }}>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
        </div>

        <div className="mt-5 grid grid-cols-2 items-center gap-5">
          <div>
            <h5 className="mb-3">Delivery Address</h5>
            <TextArea title="Delivery Address" rows={4} placeholder="Address" />
          </div>
        </div>
        <Divider />
        <div className="flex flex-col gap-5">
          <h5>Package Pickup Location</h5>
          <div className="grid grid-cols-4 gap-3">
            <Form.Item name={"email"}>
              <Input placeholder="Contact Person " />
            </Form.Item>
            <Form.Item name={"email"}>
              <Input placeholder="Phone" />
            </Form.Item>
            <Form.Item>
              <Select style={{ width: "100%" }}>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
          </div>

          <div className="mt-5 grid grid-cols-2 items-center gap-5">
            <div>
              <h5 className="mb-3">Pickup Address</h5>
              <TextArea
                title="Delivery Address"
                rows={4}
                placeholder="Address"
              />
            </div>
          </div>
          {/* Package Details */}
          <h5>Transport Details</h5>
          <div className="grid grid-cols-4 gap-3">
            <Form.Item label="Driver Name" name={"driver name"}>
              <Input placeholder="Contact Person " />
            </Form.Item>
            <Form.Item label="Driver Phone" name={"driver phone"}>
              <Input placeholder="Phone" />
            </Form.Item>

            <Form.Item label="Vehicle Number" name={"vehicle number"}>
              <Input placeholder="Phone" />
            </Form.Item>
          </div>
          {/* Vendor Details */}
          <div className="grid grid-cols-5 gap-3">
            <Form.Item label="Select Vendor">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Memo no" name={"driver name"}>
              <Input />
            </Form.Item>
            <Form.Item label="Commission" name={"driver name"}>
              <Input type="number" />
            </Form.Item>
            <Form.Item type="number" label="Cash" name={"driver name"}>
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Total" name={"driver name"}>
              <Input type="number" />
            </Form.Item>
          </div>
          {/* Packages Details table */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h5 className="mb-3">Packages Details</h5>
              <Button type="primary">Add Package</Button>
            </div>
            <CreatePackagesTable />
          </div>
          {/* Insurance Table */}
          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <h5 className="mb-3">Insurance Details</h5>
              <Button type="primary">Add Insurance</Button>
            </div>
            <CreatePackagesTable />
          </div>
          {/* Additional Details */}
          <Divider />
          <div className="grid grid-cols-6 gap-3">
            <Form.Item label="Transportation" name={"driver name"}>
              <Input type="number" />
            </Form.Item>
            <Form.Item type="number" label="Handling" name={"driver name"}>
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Halting" name={"driver name"}>
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Insurance" name={"driver name"}>
              <Input type="number" />
            </Form.Item>
            <Form.Item type="number" label="Cartage" name={"driver name"}>
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Over weight" name={"driver name"}>
              <Input type="number" />
            </Form.Item>
            <Form.Item label="ODC Charges" name={"driver name"}>
              <Input type="number" />
            </Form.Item>
            <Form.Item type="number" label="Tax Percent" name={"driver name"}>
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Advance Paid" name={"driver name"}>
              <Input type="number" />
            </Form.Item>
            <Form.Item label="Discount" name={"driver name"}>
              <Input type="number" />
            </Form.Item>
          </div>
          {/* Handle Taxes */}
          <Divider />
          <div className="">
            <div className="flex items-center justify-between mb-2">
              <h5 className="mb-3">Total Taxes</h5>
              <Form.Item name={"driver name"}>
                <Input type="number" />
              </Form.Item>
            </div>
            <div className="flex items-center justify-between mb-2">
              <h5 className="mb-3">Total </h5>
              <Form.Item name={"driver name"}>
                <Input type="number" />
              </Form.Item>
            </div>
            <div className="flex items-center justify-between mb-2">
              <h5 className="mb-3">Balance</h5>
              <Form.Item name={"driver name"}>
                <Input type="number" />
              </Form.Item>
            </div>
            {/* Remarks Section */}
            <div className="grid grid-cols-2 gap-3 ">
              <TextArea placeholder="Remarks" rows={4} />
              <div className="ml-20">
                <Form.Item label="Bill to">
                  <Radio.Group>
                    <Radio value="apple"> Consignor </Radio>
                    <Radio value="pear"> Consignee</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <Button type="primary" size="large" htmlType="submit">
            Save
          </Button>
          <Button size="large" type="default">
            Reset
          </Button>
        </div>
      </div>
    </Form>
  );
};
export default CreateShipmentForm;
