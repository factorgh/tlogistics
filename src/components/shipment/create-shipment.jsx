import { Button, DatePicker, Divider, Form, Input, Radio, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateShipmentMutation } from "../../app/services/shipment/shipment";

const CreateShipmentForm = () => {
  const [form] = Form.useForm();
  const [createShipment, { isLoading }] = useCreateShipmentMutation();
  const [packages, setPackages] = useState([{}]); // Initialize with one empty package

  const handlePackageChange = (index, key, value) => {
    const newPackages = [...packages];
    newPackages[index] = { ...newPackages[index], [key]: value };
    setPackages(newPackages);
  };

  const handleAddPackage = () => {
    setPackages([...packages, {}]); // Add a new empty package
  };

  const handleRemovePackage = (index) => {
    const newPackages = packages.filter((_, i) => i !== index);
    setPackages(newPackages);
  };

  const handleSubmit = async (values) => {
    console.log(values);

    const transformedValues = {
      ...values,
      date: values.date ? values.date.toISOString() : null,
      delivery_time: values.delivery_time
        ? values.delivery_time.toISOString()
        : null,
      packages: packages.map((pkg) => ({
        package_type: pkg.package_type,
        size: pkg.size,
        weight: pkg.weight,
        quantity: pkg.quantity,
        invoice_number: pkg.invoice_number,
        declared_value: pkg.declared_value,
        description: pkg.description,
      })),
    };

    console.log(transformedValues);

    try {
      await createShipment(transformedValues).unwrap();
      toast.success("Shipment created successfully");
      form.resetFields();
      setPackages([{}]);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create shipment");
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
              <Input placeholder="Address" />
            </Form.Item>
          </div>

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

          <Divider />

          <h5>Vendor Details</h5>
          <div className="grid grid-cols-5 gap-3">
            <Form.Item name="vendor_name" label="Vendor Name">
              <Input />
            </Form.Item>
            <Form.Item name="vendor_memo_number" label="Memo No">
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

          {/* Package Pickup Location, Transport Details, Vendor Details, etc. */}
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

          {/* New Section for Shipment Package Details */}
          <h5>Shipment Package Details</h5>
          {packages.map((pkg, index) => (
            <div key={index} className="grid grid-cols-4 gap-3 mb-4">
              <Form.Item>
                <Input
                  value={pkg.package_type}
                  placeholder="Package Type"
                  onChange={(e) =>
                    handlePackageChange(index, "package_type", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item>
                <Input
                  value={pkg.size}
                  placeholder="e.g., 10x10x10 cm"
                  onChange={(e) =>
                    handlePackageChange(index, "size", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item>
                <Input
                  type="number"
                  value={pkg.weight}
                  placeholder="Weight (kg)"
                  onChange={(e) =>
                    handlePackageChange(index, "weight", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item>
                <Input
                  type="number"
                  value={pkg.quantity}
                  placeholder="Quantity"
                  onChange={(e) =>
                    handlePackageChange(index, "quantity", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item>
                <Input
                  type="number"
                  value={pkg.invoice_number}
                  placeholder="Invoice Number"
                  onChange={(e) =>
                    handlePackageChange(index, "invoice_number", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item>
                <Input
                  type="number"
                  value={pkg.declared_value}
                  placeholder="Declared Value"
                  onChange={(e) =>
                    handlePackageChange(index, "declared_value", e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item>
                <Input
                  value={pkg.description}
                  placeholder="Description"
                  onChange={(e) =>
                    handlePackageChange(index, "description", e.target.value)
                  }
                />
              </Form.Item>
              <Button onClick={() => handleRemovePackage(index)} danger>
                Remove Package
              </Button>
            </div>
          ))}
          <Button onClick={handleAddPackage} type="dashed">
            Add Package
          </Button>
          {/* End of New Section */}

          <Divider />

          <Form.Item name="notes" label="Notes">
            <TextArea rows={4} placeholder="Notes" />
          </Form.Item>
          <Form.Item name="remarks" label="Remarks">
            <TextArea rows={4} placeholder="Notes" />
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
                <Radio value="IN_PROGRESS">In progress</Radio>
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
            <Button
              size="large"
              type="default"
              onClick={() => form.resetFields()}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default CreateShipmentForm;
