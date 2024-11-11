import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Modal, Space, Table } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  useDeleteTransitMutation,
  useGetTransitsQuery,
  useUpdateTransitMutation,
} from "../../../../app/services/financial-assets/transit";

const TransitTable = () => {
  const { data: transitData, isLoading: rentalIsLoading } =
    useGetTransitsQuery();

  console.log(transitData);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editRentalId, setEditRentalId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();

  const [updateTransit, { isLoading }] = useUpdateTransitMutation();
  const [deleteTransit] = useDeleteTransitMutation();

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setEditRentalId(null);
    setIsEditMode(false);
  };

  const showEditModal = (rental) => {
    setIsEditMode(true);
    setEditRentalId(rental.id);
    form.setFieldsValue({
      job: rental.job,
      delay_in_hour: rental.delay_in_hour,
      charge_per_hour: rental.charge_per_hour,
    });
    setIsModalVisible(true);
  };

  const handleFormSubmit = async (values) => {
    try {
      await updateTransit({
        id: editRentalId,
        transitData: values,
      }).unwrap();

      setIsModalVisible(false);
      form.resetFields();
      toast.success("Transit updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to save rental entry: " + error?.data?.message ||
          "Unknown error"
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this transit?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await deleteTransit(id).unwrap();
        toast.success("Transit deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete transit: " + error?.message);
    }
  };

  const columns = [
    {
      title: "Job",
      dataIndex: "job",
      key: "job",
    },
    {
      title: "Delay Hours",
      dataIndex: "delay_in_hour",
      key: "delay_in_hour",
    },
    {
      title: "Charge per hour",
      dataIndex: "charge_per_hour",
      key: "charge_per_hour",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            className="text-blue-500 hover:text-blue-700"
            onClick={() => showEditModal(record)}
            style={{ marginLeft: "10px" }}
          />
          <DeleteOutlined
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDelete(record.id)}
            danger
            style={{ marginLeft: "10px" }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        loading={rentalIsLoading}
        columns={columns}
        dataSource={transitData?.transit}
        rowKey="id"
        pagination={false}
      />

      <Modal
        title="Edit Transit"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={
            isEditMode
              ? { job: "", delay_in_hour: "", charge_per_hour: "" }
              : {}
          }
        >
          <Form.Item
            name="job"
            label="Job"
            rules={[{ required: true, message: "Please input the job!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Delay in Hours"
            name="delay_in_hour"
            rules={[{ required: true }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              placeholder="Enter delay in hours"
            />
          </Form.Item>

          <Form.Item
            label="Demurrage Charge per Hour"
            name="charge_per_hour"
            rules={[{ required: true }]}
          >
            <InputNumber
              style={{ width: "100%" }}
              prefix="GHC"
              placeholder="Enter charge per hour"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading} block>
              {isEditMode ? "Update Rental" : "Add Rental"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TransitTable;
