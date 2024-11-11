import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Spin,
  Table,
} from "antd";
import moment from "moment";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  useCreateRegistrationMutation,
  useDeleteRegistrationMutation,
  useGetRegistrationsQuery,
  useUpdateRegistrationMutation,
} from "../../app/services/registration/registration";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";

const VehicleRegistration = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editRegistrationData, setEditRegistrationData] = useState(null);
  const [deleterRegistration] = useDeleteRegistrationMutation();
  const [form] = Form.useForm();

  const [createRegistration, { isLoading: isCreating }] =
    useCreateRegistrationMutation();
  const [updateRegistration, { isLoading: isUpdating }] =
    useUpdateRegistrationMutation();
  const { data, isFetching } = useGetRegistrationsQuery();

  // Show modal for adding a new registration
  const showModal = () => {
    setIsModalVisible(true);
    setIsEditMode(false);
    form.resetFields();
  };

  // Show modal for editing an existing registration
  const showEditModal = (registration) => {
    setIsModalVisible(true);
    setIsEditMode(true);
    setEditRegistrationData(registration);
    form.setFieldsValue({
      registration: registration.registration,
      registration_number: registration.registration_number,
      number_plate: registration.number_plate,
      penalty_reduction: registration.penalty_reduction,
      vehicle_type: registration.vehicle_type,
      start_date: moment(registration.start_date),
      expiring_date: moment(registration.expiring_date),
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditMode(false);
    setEditRegistrationData(null); // Clear edit data
  };

  // Handle form submission (Add or Update)
  const handleFormSubmit = async (values) => {
    const transformedValues = {
      ...values,
      start_date: values.start_date.$d,
      expiring_date: values.expiring_date.$d,
    };
    console.log(transformedValues);

    try {
      if (isEditMode) {
        // Update registration
        await updateRegistration({
          id: editRegistrationData.id,
          registrationData: transformedValues,
        });
        toast.success("Vehicle Registration Updated Successfully");
      } else {
        // Create new registration
        await createRegistration(transformedValues);
        toast.success("Vehicle Registered Successfully");
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save vehicle registration");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this vehicle registration?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await deleterRegistration(id).unwrap();
        toast.success("Registration deleted successfully");
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete registration: " + error.message);
      }
    }
  };

  const columns = [
    {
      title: "Vehicle Number",
      dataIndex: "registration_number",
      key: "registration_number",
    },
    {
      title: "Registration",
      dataIndex: "registration",
      key: "registration",
    },
    {
      title: "Number Plate",
      dataIndex: "number_plate",
      key: "number_plate",
    },
    {
      title: "Vehicle Type",
      dataIndex: "vehicle_type",
      key: "vehicle_type",
    },
    {
      title: "Registration Date",
      dataIndex: "start_date",
      key: "start_date",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Expiry Date",
      dataIndex: "expiring_date",
      key: "expiring_date",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-3">
          <EditOutlined onClick={() => showEditModal(record)} />
          <DeleteOutlined
            color="red"
            onClick={() => handleDelete(record?.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <CustomLayout>
      <div className="flex justify-between items-center">
        <CustomHeader headerTitle="Vehicle Registration" />
        <Button type="primary" onClick={showModal}>
          Add Vehicle Registration
        </Button>

        <Modal
          title={
            isEditMode
              ? "Edit Vehicle Registration"
              : "Add Vehicle Registration"
          } // Dynamic title
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
            {/* Registration Fields */}
            <Form.Item
              label="Registration"
              name="registration"
              rules={[
                {
                  required: true,
                  message: "Please enter the registration details!",
                },
              ]}
            >
              <Input placeholder="Enter Vehicle Registration" />
            </Form.Item>

            <Form.Item
              label="Vehicle Registration Number"
              name="registration_number"
              rules={[
                {
                  required: true,
                  message: "Please enter the registration number!",
                },
              ]}
            >
              <Input placeholder="Enter Registration Number" />
            </Form.Item>

            <Form.Item
              label="Number Plate Type"
              name="number_plate"
              rules={[
                {
                  required: true,
                  message: "Please select the number plate type!",
                },
              ]}
            >
              <Select placeholder="Select Number Plate Type">
                <Select.Option value="commercial">Commercial</Select.Option>
                <Select.Option value="private">Private</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Penalty Reduction"
              name="penalty_reduction"
              rules={[
                {
                  required: true,
                  message: "Please enter penalty reduction amount!",
                },
              ]}
            >
              <InputNumber
                placeholder="Enter Penalty Reduction (if any)"
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label="Type of Vehicle Registered"
              name="vehicle_type"
              rules={[
                {
                  required: true,
                  message: "Please select the type of vehicle!",
                },
              ]}
            >
              <Select placeholder="Select Type of Vehicle">
                <Select.Option value="truck">Truck</Select.Option>
                <Select.Option value="salonCar">Salon Car</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Start Date"
              name="start_date"
              rules={[
                { required: true, message: "Please select the start date!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Expiring Date"
              name="expiring_date"
              rules={[
                { required: true, message: "Please select the expiring date!" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item>
              <Button
                className="w-full"
                type="default"
                htmlType="submit"
                block
                // loading={isCreating || isUpdating}
              >
                {isCreating || isUpdating ? <Spin /> : "Submit"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <Table
        loading={isFetching}
        dataSource={data?.vehicleRegistration || []}
        columns={columns}
        rowKey={(record) => record.registration_number}
        style={{ marginTop: "20px" }}
      />
    </CustomLayout>
  );
};

export default VehicleRegistration;
