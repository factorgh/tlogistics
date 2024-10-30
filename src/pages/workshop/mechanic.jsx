import { Button, Divider, Form, Input, Modal, Select, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateMechanicMutation } from "../../app/services/workshop/mechanic";
import MechanicTable from "../../components/workshop/mechanic-table";
import SparePartsInput from "../../components/workshop/spare-parts-input";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const Mechanic = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [spareParts, setSpareParts] = useState([]); // State to hold spare parts
  const [createMechanic, { isLoading }] = useCreateMechanicMutation();

  const handleSparePartsChange = (newSpareParts) => {
    setSpareParts(newSpareParts); // Update spare parts state
  };

  const handleSubmit = async (values) => {
    const mechanicData = { ...values, spare_parts: spareParts }; // Include spare parts in submission
    console.log(mechanicData);
    // Handle form submission logic here
    if (editingRecord) {
      console.log("Updating record:", editingRecord.id);
      // Code for updating record in the backend goes here
    } else {
      console.log("Adding new record");
      try {
        await createMechanic(mechanicData).unwrap();
        toast.success("Mechanic activity created");
      } catch (error) {
        console.log(error);
        toast.error("Failed to create mechanic activity");
      }
    }
    setIsModalVisible(false);
    form.resetFields();
    setEditingRecord(null);
  };

  const openModalForAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setSpareParts([]); // Reset spare parts when opening modal
    setIsModalVisible(true);
  };

  const openModalForEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  return (
    <CustomLayout>
      <div className="flex items-center justify-between">
        <CustomHeader headerTitle={"Workshop Mechanic"} />
        <div>
          <Button
            type="primary"
            onClick={openModalForAdd}
            className="ml-3 text-white"
          >
            Add Mechanic Summary
          </Button>
          <Button type="primary" className="bg-green-500 ml-3 text-white">
            Daily Report
          </Button>
        </div>
      </div>

      <MechanicTable onEdit={openModalForEdit} />

      <Modal
        width={800}
        title={
          editingRecord ? "Update Mechanic Summary" : "Add Mechanic Summary"
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form onFinish={handleSubmit} layout={"vertical"} form={form}>
          <Divider />
          <div className="grid grid-cols-2 gap-3">
            <Form.Item
              label="Vehicle Maintenance"
              name={"vehicle_maintenance"}
              rules={[
                { required: true, message: "Please enter vehicle maintenance" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Truck Assistant"
              name={"truck_assistance"}
              rules={[
                { required: true, message: "Please enter truck assistant" },
              ]}
            >
              <Input />
            </Form.Item>

            {/* <Form.Item
              label="Registration Expiry Date"
              name={"reg_expiry_Date"}
              rules={[
                {
                  required: true,
                  message: "Please enter registration expiry date",
                },
              ]}
            >
              <Input />
            </Form.Item> */}

            {/* <Form.Item
              label="Insurance Expiry Date"
              name={"insurance_expiry_date"}
              rules={[
                {
                  required: true,
                  message: "Please enter insurance expiry date",
                },
              ]}
            >
              <Input />
            </Form.Item> */}
          </div>
          <SparePartsInput onSparePartsChange={handleSparePartsChange} />{" "}
          {/* Pass the handler function */}
          <Form.Item label="Overhaul/Repair" name={"repair_and_overhaul"}>
            <Select>
              <Select.Option value="repair">Repair</Select.Option>
              <Select.Option value="overhaul">Overhaul</Select.Option>
            </Select>
          </Form.Item>
          <div>
            <h5 className="mb-3">Daily Report </h5>
            <Form.Item
              name={"daily_report_cost"}
              rules={[
                {
                  required: true,
                  message: "Please enter daily report",
                },
              ]}
            >
              <TextArea rows={4} />
            </Form.Item>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div>
              <h5 className="mb-3">Diagnostic Services</h5>
              <Form.Item
                name={"diagnostic_services"}
                rules={[
                  {
                    required: true,
                    message: "Please enter diagnostic services",
                  },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>
            </div>

            <div>
              <h5 className="mb-3">Breakdown Response Team</h5>
              <Form.Item
                name={"break_down_response"}
                rules={[
                  {
                    required: true,
                    message: "Please enter breakdown response team",
                  },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>
            </div>
          </div>
          {isLoading ? (
            <Button className="w-full px-5" htmlType="submit" disabled>
              <Spin />
            </Button>
          ) : (
            <Button className="w-full px-5" type="primary" htmlType="submit">
              {editingRecord ? "Update" : "Submit"}
            </Button>
          )}
        </Form>
      </Modal>
    </CustomLayout>
  );
};

export default Mechanic;
