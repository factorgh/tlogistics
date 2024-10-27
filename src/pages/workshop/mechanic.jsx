import { Button, Divider, Form, Input, Modal, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreateMechanicMutation,
  useUpdateMechanicMutation,
} from "../../app/services/workshop/mechanic";
import MechanicTable from "../../components/workshop/mechanic-table";
import SparePartsInput from "../../components/workshop/spare-parts-input";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const Mechanic = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [createMechanic] = useCreateMechanicMutation();
  const [updateMechanic] = useUpdateMechanicMutation();

  const handleSubmit = async (values) => {
    console.log(values);
    // Handle form submission logic here
    if (editingRecord) {
      // Update the record
      console.log("Updating record:", editingRecord.id);
      // Code for updating record in the backend goes here
    } else {
      // Add a new record
      console.log("Adding new record");
      // Code for adding new record in the backend goes here
      try {
        console.log(values);
        await createMechanic(values).unwrap();
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
              name={"vehicleMaintenance"}
              rules={[
                { required: true, message: "Please enter vehicle maintenance" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Truck Assistant"
              name={"truckAssistant"}
              rules={[
                { required: true, message: "Please enter truck assistant" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Registration Expiry Date"
              name={"registrationExpiryDate"}
              rules={[
                {
                  required: true,
                  message: "Please enter registration expiry date",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Insurance Expiry Date"
              name={"insuranceExpiryDate"}
              rules={[
                {
                  required: true,
                  message: "Please enter insurance expiry date",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
          <SparePartsInput />
          <Form.Item label="Overhaul/Repair" name={"overhaulRepair"}>
            <Select>
              <Select.Option value="repair">Repair</Select.Option>
              <Select.Option value="overhaul">Overhaul</Select.Option>
            </Select>
          </Form.Item>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div>
              <h5 className="mb-3">Diagnostic Services</h5>
              <Form.Item
                name={"diagnosticServices"}
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
                name={"breakdownResponseTeam"}
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
          <Button type="primary" htmlType="submit">
            {editingRecord ? "Update" : "Submit"}
          </Button>
        </Form>
      </Modal>
    </CustomLayout>
  );
};

export default Mechanic;
