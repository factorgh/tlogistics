import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Spin, Table } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  useDeleteLogisticMutation,
  useGetLogisticsQuery,
  useUpdateLogisticMutation,
} from "../../../../app/services/financial-assets/logistics";

const LogisticsTable = () => {
  const { data: logisticsData, isLoading: rentalIsLoading } =
    useGetLogisticsQuery();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editRentalId, setEditRentalId] = useState(null); // Rental ID to identify which rental is being edited

  const [form] = Form.useForm();

  const [updateLogistics, { isLoading }] = useUpdateLogisticMutation();
  const [deleteLogistics] = useDeleteLogisticMutation();

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditRentalId(null);
  };

  const showEditModal = (logistic) => {
    console.log(logistic);
    setEditRentalId(logistic.id);
    form.setFieldsValue({
      asset_type: logistic.asset_type,
      details: logistic.details,
    });
    setIsModalVisible(true);
  };

  // Handle submit (either update or create a new rental)
  const handleFormSubmit = async (values) => {
    console.log(values);
    try {
      await updateLogistics({
        id: editRentalId,
        logisticData: values,
      }).unwrap();
      toast.success("Logistics updated successfully");
      setIsModalVisible(false); // Close modal after submission
      form.resetFields();
    } catch (error) {
      console.log(error);
      toast.error("Failed to save rental entry: " + error?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this logistics?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await deleteLogistics(id).unwrap();
        toast.success("Logistocs deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete rental: " + error?.message);
    }
  };

  const logisticColumns = [
    {
      title: "Asset Type",
      dataIndex: "asset_type",
      key: "asset_type",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-3">
          <EditOutlined
            className="text-blue-500 hover:text-blue-700"
            onClick={() => {
              console.log(record);
              showEditModal(record); // Fix: use showEditModal directly
            }}
          />
          <DeleteOutlined
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDelete(record.id)} // Fix: use record.id for deletion
            danger
            style={{ marginLeft: "10px" }}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <Table
        loading={rentalIsLoading}
        pagination={true}
        columns={logisticColumns} // Fix: Use logisticColumns here
        dataSource={logisticsData?.logistics}
        scroll={{ x: 1000 }}
        className="border border-slate-200 rounded-md"
        rowKey="agentName"
      />
      <Modal
        title="Edit Logistocs "
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          {/* Add Asset Type */}
          {/* Add Asset Type */}
          <Form.Item
            label="Asset Type"
            name="asset_type"
            rules={[{ required: true }]}
          >
            <Select placeholder="Select Asset Type">
              <Select.Option value="vehicle">Vehicle</Select.Option>
              <Select.Option value="driver">Driver</Select.Option>
              <Select.Option value="warehouse">Warehouse</Select.Option>
            </Select>
          </Form.Item>

          {/* Add Asset Details */}
          <Form.Item
            label="Asset Details"
            name="details"
            rules={[{ required: true }]}
          >
            <Input.TextArea placeholder="Enter details of the asset (e.g., vehicle plate, driver name)" />
          </Form.Item>
          {/* Save Button */}
          <Form.Item>
            {isLoading ? (
              <Button className="w-full" htmlType="submit" disabled>
                <Spin />
              </Button>
            ) : (
              <Button type="primary" className="w-full" htmlType="submit">
                Update Asset
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default LogisticsTable;
