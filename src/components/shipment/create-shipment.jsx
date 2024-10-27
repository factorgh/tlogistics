import { Button, DatePicker, Divider, Form, Input, Radio, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { toast } from "react-toastify";
import { useCreateShipmentMutation } from "../../app/services/shipment/shipment";

const CreateShipmentForm = () => {
  const [form] = Form.useForm();
  const [createShipment, { isLoading }] = useCreateShipmentMutation();

  const handleSubmit = async (values) => {
    console.log(values);

    const tranformedValues = {
      ...values,
      date: values.date ? values.date.toISOString() : null,
      delivery_time: values.delivery_time
        ? values.delivery_time.toISOString()
        : null,
    };

    console.log(tranformedValues);

    try {
      await createShipment(tranformedValues).unwrap();
    } catch (error) {
      console.log(error);
      toast.error("Failed to create shipment ");
    }
  };

  return (
    <Form onFinish={handleSubmit} layout="vertical" form={form}>
      <div>
        <div className="grid grid-cols-3 gap-3">
          <Form.Item name="date" label="Shipment Date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item name="delivery_time" label="Expected Delivery Date">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </div>

        <div className="mt-5 grid grid-cols-2 items-center gap-5">
          <div>
            <h5 className="mb-3">Delivery Address</h5>
            <Form.Item name="delivery_address">
              <TextArea rows={4} placeholder="Address" />
            </Form.Item>
          </div>
        </div>

        <Divider />

        <div className="flex flex-col gap-5">
          <h5>Package Pickup Location</h5>
          <div className="grid grid-cols-4 gap-3">
            <Form.Item name="pickup_person_name" label="Contact Person">
              <Input placeholder="Contact Person" />
            </Form.Item>
            <Form.Item name="pickup_person_phone" label="Phone">
              <Input placeholder="Phone" />
            </Form.Item>
            <Form.Item name="pickup_address" label="Address">
              <Input placeholder="address" />
            </Form.Item>
          </div>

          {/* <div className="mt-5 grid grid-cols-2 items-center gap-5">
            <div>
              <h5 className="mb-3">Pickup Address</h5>
              <Form.Item name="pickupAddress">
                <TextArea rows={4} placeholder="Address" />
              </Form.Item>
            </div>
          </div> */}

          <h5>Transport Details</h5>
          <div className="grid grid-cols-4 gap-3">
            <Form.Item name="driver_name" label="Driver Name">
              <Input placeholder="Driver Name" />
            </Form.Item>
            <Form.Item name="driver_phone" label="Driver Phone">
              <Input placeholder="Phone" />
            </Form.Item>
            <Form.Item name="driver_vehicle" label="Vehicle Number">
              <Input placeholder="Vehicle Number" />
            </Form.Item>
          </div>

          <h5>Vendor Details</h5>
          <div className="grid grid-cols-5 gap-3">
            <Form.Item name="vendor_name" label="Vendor Name">
              <Input />
            </Form.Item>
            <Form.Item name="vendor_memo_number" label="Memo no">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="vendor_commission" label="Commission">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="vendor_cash" label="Cash">
              <Input type="number" />
            </Form.Item>

            <Form.Item name="vendor_advance" label="Advance">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="vendor_total" label="Total">
              <Input type="number" />
            </Form.Item>
          </div>

          <Divider />

          <div className="grid grid-cols-6 gap-3">
            <Form.Item name="charge_transportation" label="Transportation">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="charge_handling" label="Handling">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="charge_halting" label="Halting">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="charge_insurance" label="Insurance">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="charge_cartage" label="Cartage">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="charge_overweight" label="Overweight">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="charge_odc" label="Odc">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="charge_tax_percent" label="Tax Percent">
              <Input type="number" />
            </Form.Item>
            <Form.Item name="charge_discount" label="Discount">
              <Input type="number" />
            </Form.Item>
          </div>

          <Divider />

          <Form.Item name="notes" label="Notes">
            <TextArea rows={4} placeholder="notes" />
          </Form.Item>
          <Form.Item name="remarks" label="Remarks">
            <TextArea rows={4} placeholder="notes" />
          </Form.Item>
          <div className="grid grid-cols-3 gap-3">
            <Form.Item name="bill_to" label="Bill to">
              <Radio.Group>
                <Radio value="consignor">Consignor</Radio>
                <Radio value="consignee">Consignee</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="status" label="Status">
              <Radio.Group>
                <Radio value="DELIVERED">Delivered</Radio>
                <Radio value="IN_Progress">In progress</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="load_type" label="Load Type">
              <Radio.Group>
                <Radio value="FULL">Full</Radio>
                <Radio value="PART">Part</Radio>
              </Radio.Group>
            </Form.Item>
          </div>

          <div className="mt-5 flex items-center gap-3">
            {isLoading ? (
              <Spin />
            ) : (
              <Button type="primary" size="large" htmlType="submit">
                Save
              </Button>
            )}
            <Button size="large" type="default">
              Reset
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default CreateShipmentForm;
