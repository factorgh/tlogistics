import { DatePicker, Divider, Form, Input, Select } from "antd";
import StaffListTable from "../components/staff/staff-list-table";
import CustomHeader from "../core/custom-header";
import CustomModal from "../core/custom_modal";

const StaffList = () => {
  const [form] = Form.useForm();

  const handleSubmit = () => {};
  return (
    <div className="bg-white w-full h-full p-5 border border-gray-200 rounded-md">
      <div className="flex items-center justify-between mb-3">
        <CustomHeader headerTitle="Staff List" />
        <CustomModal header={"Add New Staff"} buttonTitle="Add Staff">
          <Form onFinish={handleSubmit} layout={"vertical"} form={form}>
            <div>
              <Divider />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Form.Item label="Name" name={"name"}>
                    <Input placeholder="Enter your name" />
                  </Form.Item>
                  <Form.Item label="Select Position">
                    <Select defaultValue="admin">
                      <Select.Option value="admin">Admin</Select.Option>
                      <Select.Option value="employee">Employee</Select.Option>
                      <Select.Option value="transport">
                        Transport Manager
                      </Select.Option>
                      <Select.Option value="warehouse">
                        Warehouse Manager
                      </Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="License" name={"license"}>
                    <Input placeholder="License" />
                  </Form.Item>
                  <Form.Item label="Starting Date">
                    <DatePicker style={{ width: "100%" }} />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item label="Phone Number" name={"phoneNumber"}>
                    <Input placeholder="Phone" />
                  </Form.Item>
                  <Form.Item label="Emergency Number" name={"emergencyNumber"}>
                    <Input placeholder="Emergency number" />
                  </Form.Item>
                  <Form.Item label="Employee Address" name={"employee address"}>
                    <Input placeholder="Employee Address" />
                  </Form.Item>
                  <Form.Item label="Status" name={"status"}>
                    <Input placeholder="Status" />
                  </Form.Item>
                </div>
              </div>
            </div>
          </Form>
        </CustomModal>
      </div>

      <div>
        {/* Add customer form */}
        <StaffListTable />
      </div>
    </div>
  );
};

export default StaffList;
