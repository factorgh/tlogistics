import { Button, Collapse, Divider, Form, Input, Modal, Spin } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  useCreatePurchaseMutation,
  useGetPurchasesQuery,
} from "../../app/services/workshop/purchase";
import PurchaseTable from "../../components/workshop/purchase-table";
import PartsInput from "../../components/workshop/purchase_items";
import CustomHeader from "../../core/custom-header";
import CustomLayout from "../../core/custom-layout";
import ExportDailyExcel from "../../utils/excel-daily-downloader";

const { Panel } = Collapse;

const Purchase = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [spareParts, setSpareParts] = useState([]);
  const [workingGearsAndTools, setWorkingGearsAndTools] = useState([]);
  // const [purchaseReturnScrap, setPurchaseReturnScrap] = useState([]);
  const [createPurchase, { isLoading }] = useCreatePurchaseMutation();
  const { data } = useGetPurchasesQuery();
  console.log(data);

  const handleSubmit = async (values) => {
    const formattedValues = {
      ...values,
      spare_parts: spareParts,
      tools: workingGearsAndTools,
      // purchase_return_scrap: purchaseReturnScrap,
    };

    console.log(formattedValues);

    try {
      await createPurchase(formattedValues).unwrap();
      form.resetFields();
      toast.success("Purchase Created Successfully");
    } catch (error) {
      toast.error(error.data?.message);
    }

    setIsModalVisible(false);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <CustomLayout>
      <div className="flex items-center justify-between">
        <CustomHeader headerTitle={"Workshop Purchase"} />
        <div>
          <Button
            type="primary"
            onClick={showModal}
            className="ml-3 text-white"
          >
            Add Purchase Summary
          </Button>
          <ExportDailyExcel data={data?.purchase}>
            <h3>Daily Report</h3>
          </ExportDailyExcel>
        </div>

        <Modal
          title="Purchase Details"
          open={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          width={800}
        >
          <Form onFinish={handleSubmit} layout="vertical" form={form}>
            <Divider />

            <Collapse defaultActiveKey={["1"]}>
              <Panel header="Spare Parts Cost" key="1">
                <PartsInput title="Spare Parts" onPartsChange={setSpareParts} />
              </Panel>

              <Panel header="Working Gears and Tools Cost" key="2">
                <PartsInput
                  title="Working Gears and Tools"
                  onPartsChange={setWorkingGearsAndTools}
                />
              </Panel>
            </Collapse>

            <Divider orientation="left">Scrap</Divider>
            <Form.Item label="Scrap" name="scrab">
              <Input type="number" placeholder="Enter scrab" />
            </Form.Item>

            {/* <Divider orientation="left">Purchase Return Scrap</Divider>
            <PartsInput
              title="Purchase Return Scrap"
              onPartsChange={setPurchaseReturnScrap}
            />

            <Divider orientation="left">Monthly Report</Divider>
            <Form.Item
              label="Monthly Report"
              name="monthly_report"
              rules={[
                { required: true, message: "Please enter monthly report" },
              ]}
            >
              <Input.TextArea placeholder="Enter monthly report details" />
            </Form.Item>

            <Divider /> */}

            <Form.Item>
              {isLoading ? (
                <Button className="w-full" htmlType="submit">
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
      </div>
      <PurchaseTable />
    </CustomLayout>
  );
};

export default Purchase;
