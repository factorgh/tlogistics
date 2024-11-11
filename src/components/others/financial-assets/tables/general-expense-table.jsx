import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Spin, Table } from "antd";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  useDeleteGeneralExpenseMutation,
  useGetGeneralExpensesQuery,
  useUpdateGeneralExpenseMutation,
} from "../../../../app/services/financial-assets/general-expense";

const GeneralExpenseTable = () => {
  const searchInput = useRef(null);
  const { data: generalData, isLoading: rentalIsLoading } =
    useGetGeneralExpensesQuery();
  console.log(generalData);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editRentalId, setEditRentalId] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [form] = Form.useForm();

  const [updateExpense, { isLoading }] = useUpdateGeneralExpenseMutation();
  const [deleteGeneral] = useDeleteGeneralExpenseMutation();

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
      police_and_accident: rental.police_and_accident,
      amount: rental.amount,
    });
    setIsModalVisible(true);
  };

  const handleFormSubmit = async (values) => {
    try {
      if (isEditMode) {
        await updateExpense({
          id: editRentalId,
          expenseData: values,
        }).unwrap();
        toast.success("Rental updated successfully");
      } else {
        toast.success("New rental added successfully");
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      toast.error("Failed to save rental entry: " + error?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Do you want to delete this rental?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        await deleteGeneral(id).unwrap();
        toast.success("General expense deleted successfully");
      }
    } catch (error) {
      toast.error("Failed to delete expense: " + error?.message);
    }
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          style={{ marginBottom: 8, display: "block" }}
        />
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
  });

  const columns = [
    {
      title: "Police Cases & Accidents",
      dataIndex: "police_and_accident",
      key: "police_and_accident",
      ...getColumnSearchProps("police_and_accident"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      ...getColumnSearchProps("amount"),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-3">
          <EditOutlined onClick={() => showEditModal(record)} />
          <DeleteOutlined
            onClick={() => handleDelete(record.id)}
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
        pagination
        columns={columns}
        dataSource={generalData?.generalExpenses}
        scroll={{ x: 1000 }}
        className="border border-slate-200 rounded-md"
        rowKey="id" // Correct rowKey
      />
      <Modal
        title="Edit Expense"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            label="Police and Accident Cases"
            name="police_and_accident"
            rules={[{ required: true, message: "Please enter cases here" }]}
          >
            <Input placeholder="Enter cases" />
          </Form.Item>
          <Form.Item
            label="Amount"
            name="amount"
            rules={[{ required: true, message: "Please enter the amount" }]}
          >
            <Input placeholder="Enter amount" />
          </Form.Item>

          <Form.Item>
            {isLoading ? (
              <Button className="w-full" htmlType="submit" disabled>
                <Spin />
              </Button>
            ) : (
              <Button className="w-full" type="primary" htmlType="submit">
                Submit
              </Button>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default GeneralExpenseTable;
