import { Button, Form, Input, Modal, Spin, Table } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { IoMdTrash } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  useDeleteInsuranceMutation,
  useGetInsurancesQuery,
  useUpdateInsuranceMutation,
} from "../../app/services/insurance/insurance";
import InsuranceForm from "../../components/others/insurance-form";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const Insurance = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [insuranceEntries, setInsuranceEntries] = useState([]);
  const { data, isFetching } = useGetInsurancesQuery();

  const [updateInsurance, { isLoading, error }] = useUpdateInsuranceMutation();
  const [deleteInsurance] = useDeleteInsuranceMutation();

  const [form] = Form.useForm();

  const [editInsuranceData, setEditInsuranceData] = useState(null);
  const [editInsuranceId, setEditInsuranceId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false); // New state to check if we are in edit mode

  // Function to show modal
  const showModal = () => {
    setIsModalVisible(true);
    setIsEditMode(false); // Reset to "Add" mode when opening modal
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditInsuranceData(null);
    setIsEditMode(false); // Reset to "Add" mode when closing modal
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this insurance?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleteInsurance(id).unwrap();
        toast.success("Insurance deleted successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete insurance: " + error.message);
      }
    }
  };

  const showEditModal = (insurance) => {
    setIsEditMode(true);
    setEditInsuranceData(insurance);
    setEditInsuranceId(insurance.id);
    form.setFieldsValue({
      insurer: insurance.insurer,
      start_date: moment(insurance.start_date),
      end_date: moment(insurance.end_date),
      claims: insurance.claims,
      invoices: insurance.invoices,
      refunds: insurance.refunds,
    });

    setIsModalVisible(true);
  };

  const handleSubmit = async (values) => {
    console.log(values);

    try {
      const response = await updateInsurance({
        id: editInsuranceId,
        insuranceData: values,
      });
      console.log(response);
      form.resetFields();
      setIsModalVisible(false);
      toast.success("Insurance updated successfully");
    } catch (err) {
      console.log(err);
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  const handleFormSubmit = (entry) => {
    setInsuranceEntries([...insuranceEntries, entry]);
    console.log("Insurance entry submitted:", entry);
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Insurer",
      dataIndex: "insurer",
      key: "insurer",
    },
    {
      title: "Start Date",
      dataIndex: "start_date",
      key: "start_date",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "End Date",
      dataIndex: "end_date",
      key: "end_date",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Claims",
      dataIndex: "claims",
      key: "claims",
      render: (claims) =>
        claims?.map((claim) => claim.description).join(", ") || "No Claims",
    },
    {
      title: "Invoices",
      dataIndex: "invoices",
      key: "invoices",
      render: (invoices) =>
        invoices?.map((invoice) => invoice.number).join(", ") || "No Invoices",
    },
    {
      title: "Refunds",
      dataIndex: "refunds",
      key: "refunds",
      render: (refunds) =>
        refunds?.map((refund) => refund.chequeNo).join(", ") || "No Refunds",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-3">
          <MdEdit onClick={() => showEditModal(record)} />
          <IoMdTrash color="red" onClick={() => handleDelete(record?.id)} />
        </div>
      ),
    },
  ];

  useEffect(() => {
    setInsuranceEntries(data?.insurances || []);
  }, [data]);

  return (
    <CustomLayout>
      <div className="flex justify-between items-center">
        <CustomHeader headerTitle="Insurance" />
        <Button type="primary" onClick={showModal}>
          Add Insurance
        </Button>

        <Modal
          title={isEditMode ? "Edit Insurance" : "Add Insurance"} // Conditionally change title
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          {isEditMode ? (
            // If we're editing, show the edit form
            <Form onFinish={handleSubmit} layout="vertical" form={form}>
              <Form.Item label="Insurer" name="insurer">
                <Input />
              </Form.Item>
              <Form.Item label="Start Date" name="start_date">
                <Input type="date" />
              </Form.Item>
              <Form.Item label="End Date" name="end_date">
                <Input type="date" />
              </Form.Item>
              <Form.Item label="Claims" name="claims">
                <Input />
              </Form.Item>
              <Form.Item label="Invoices" name="invoices">
                <Input />
              </Form.Item>
              <Form.Item label="Refunds" name="refunds">
                <Input />
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                loading={isLoading}
              >
                {isLoading ? <Spin /> : "Submit"}
              </Button>
            </Form>
          ) : (
            // If we're adding a new insurance, show the add form
            <InsuranceForm onSubmit={handleFormSubmit} />
          )}
        </Modal>
      </div>

      <Table
        loading={isFetching}
        dataSource={insuranceEntries}
        columns={columns}
        style={{ marginTop: "20px" }}
      />
    </CustomLayout>
  );
};

export default Insurance;
