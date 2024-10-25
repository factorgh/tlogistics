import { Button, Divider, Form, Input, Spin } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react"; // Import useEffect
import {
  MdEdit,
  MdOutlineLocalShipping,
  MdOutlinePayments,
  MdPayment,
  MdPayments,
} from "react-icons/md";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useDeleteCustomerMutation,
  useGetSingleCustomerQuery,
  useUpdateCustomerMutation,
} from "../app/services/customer/customer";
import CustomerDetailTable from "../components/customer/customer-detail-table";
import DashboardItem from "../components/dashboard/dashboardItem";
import CustomLayout from "../core/custom-layout";
import { Spinner } from "../core/spinner";

const CustomerDetail = () => {
  const [form] = Form.useForm();
  const [showFilter, setShowFilter] = useState("invoices");
  const location = useLocation();

  const userId = location.state.customerId;
  console.log("Customer ID:", userId);
  const { data, isFetching, error } = useGetSingleCustomerQuery(userId);
  const [updateCustomer, { isLoading }] = useUpdateCustomerMutation();
  const [deleteCustomer, { isLoading: delLoading, isSuccess }] =
    useDeleteCustomerMutation(userId);
  console.log(data);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data?.customer.name || "",
        email: data?.customer.email || "",
        phone: data?.customer.phone || "",
        address: data?.customer.address || "",
      });
    }
  }, [data, form]);

  const handleSubmit = async (values) => {
    console.log("Form Submitted", values);
    toast.success("Customer Updated Successfully");
    try {
      await updateCustomer({ ...values, id: userId }).unwrap();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update Customer ");
    }
  };

  const handleDelete = async () => {
    await deleteCustomer();
  };

  const handleButtonClick = (filter) => {
    setShowFilter(filter);
  };

  if (isFetching) {
    return <Spin />;
  }
  if (error) {
    toast.error(error?.data?.message);
  }

  return (
    <CustomLayout>
      <div className="grid grid-cols-3 gap-5">
        <div className="flex flex-col border border-gray-300 rounded-md">
          <div className="flex flex-col items-center mt-3">
            <img
              src="/images/profile.png"
              className="h-32 w-32 rounded-md"
              alt=""
            />
            <h5 className="mt-3 text-2xl font-bold mb-3">
              {data?.customer?.name}
            </h5>
            <Button type="link">Adroit 360</Button>
          </div>
          <Divider />
          <div className="flex flex-col">
            <div className="flex flex-col pl-5 mb-5">
              <h3 className="font-bold">Email</h3>
              {data?.customer?.email}
            </div>
            <div className="flex flex-col pl-5 mb-5">
              <h3 className="font-bold">Phone</h3>
              <p>{data?.customer?.phone}</p>
            </div>
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-3">
          <div className="items-center justify-center flex-col border border-gray-300 rounded-md p-5">
            <div className="flex gap-3">
              <Button
                type={showFilter === "invoices" ? "primary" : "default"}
                icon={<MdPayments />}
                onClick={() => handleButtonClick("invoices")}
              >
                Invoices
              </Button>
              <Button
                type={showFilter === "edit" ? "primary" : "default"}
                icon={<MdEdit />}
                onClick={() => handleButtonClick("edit")}
              >
                Edit
              </Button>
            </div>

            {/* Handle filter here */}
            <div>
              {showFilter === "invoices" && (
                <div>
                  <div className="grid grid-cols-3 gap-3 mt-3">
                    <DashboardItem
                      headerText="Outstanding Invoices"
                      icon={<MdPayment size={50} className="text-slate-300" />}
                      text="100"
                    />
                    <DashboardItem
                      headerText="Paid Invoices"
                      icon={
                        <MdOutlinePayments
                          size={50}
                          className="text-slate-300"
                        />
                      }
                      text="180"
                    />
                    <DashboardItem
                      headerText="Total Invoices"
                      icon={
                        <MdOutlineLocalShipping
                          size={50}
                          className="text-slate-300"
                        />
                      }
                      text="10"
                    />
                  </div>
                  <div className="p-3 mt-5 rounded-md border border-gray-300">
                    <h3 className="font-bold mb-3 text-blue-500">
                      Recent Invoices
                    </h3>
                    <CustomerDetailTable />
                  </div>
                </div>
              )}

              {showFilter === "edit" && (
                <div>
                  <Form onFinish={handleSubmit} layout={"vertical"} form={form}>
                    <Divider />
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Please enter your name",
                            },
                          ]}
                          label="Name"
                          name="name"
                        >
                          <Input placeholder="Enter your name" />
                        </Form.Item>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Please enter your email",
                            },
                          ]}
                          label="Email"
                          name="email"
                        >
                          <Input placeholder="Enter your email" />
                        </Form.Item>
                      </div>
                      <div>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Please enter your phone",
                            },
                          ]}
                          label="Phone"
                          name="phone"
                        >
                          <Input placeholder="Enter your phone" />
                        </Form.Item>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Please enter your address",
                            },
                          ]}
                          label="Address"
                          name="address"
                        >
                          <Input placeholder="Enter your address" />
                        </Form.Item>
                      </div>
                    </div>
                    <Divider />
                    <div className="mt-5">
                      <h3 className="text-md">Notes</h3>
                      <TextArea
                        rows={4}
                        placeholder="User Notes - For internal use only"
                      />
                    </div>
                  </Form>
                  <div className="flex gap-3 mt-5">
                    <Button
                      onClick={handleSubmit}
                      className="border border-blue-500 text-blue-500"
                    >
                      {isLoading ? <Spinner /> : "Update"}
                    </Button>
                    <Button
                      onClick={handleDelete}
                      className="border border-red-500 text-red-500"
                    >
                      Delete Customer
                    </Button>
                  </div>
                </div>
              )}
            </div>
            {/* Handle filter end */}
          </div>
        </div>
      </div>
    </CustomLayout>
  );
};

export default CustomerDetail;
