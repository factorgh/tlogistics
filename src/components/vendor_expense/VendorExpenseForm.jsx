import { Modal, Input, Select, Form, Button, InputNumber } from "antd";
import { useGetVendorsQuery } from "../../app/services/vendors/vendors";
import { data } from "autoprefixer";

const VendorExpenseForm = ({ onFinish, isOpen, toggleOpen }) => {
    const [form] = Form.useForm();

    const { data } = useGetVendorsQuery();

    const vendorOptions = data
        ? data?.vendors?.map(({ name, id }) => ({
              label: name,
              value: id,
          }))
        : [];

    return (
        <div>
            <Modal title="Vendor Expense" open={isOpen} footer={null} onCancel={toggleOpen} l>
                <Form name="vendor_expense" layout="vertical" onFinish={onFinish} form={form}>
                    <Form.Item label="Vendor" name="vender_id">
                        <Select placeholder="Select vendor" options={vendorOptions} />
                    </Form.Item>
                    <Form.Item label="Name" name="name">
                        <Input placeholder="Enter name" />
                    </Form.Item>
                    <Form.Item label="Amount" name="amount">
                        <InputNumber placeholder="Enter amount" className=" w-full" />
                    </Form.Item>
                    <Form.Item label="Note" name="notes">
                        <Input placeholder="Enter note" />
                    </Form.Item>
                    <Form.Item>
                        <Button className="w-full" htmlType="submit" type="primary">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default VendorExpenseForm;
