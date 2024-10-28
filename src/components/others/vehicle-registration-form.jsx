import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";

const { RangePicker } = DatePicker;

const VehicleRegistrationForm = () => {
  return (
    <Form
      layout="vertical"
      onFinish={(values) => console.log("Form Values:", values)}
    >
      {/* Vehicle Registration */}
      <Form.Item
        label="Registration"
        name="registration"
        rules={[
          { required: true, message: "Please enter the registration details!" },
        ]}
      >
        <Input placeholder="Enter Vehicle Registration" />
      </Form.Item>

      {/* Vehicle Registration Number & Plate Type */}
      <Form.Item
        label="Vehicle Registration Number"
        name="vehicleRegistrationNumber"
        rules={[
          { required: true, message: "Please enter the registration number!" },
        ]}
      >
        <Input placeholder="Enter Registration Number" />
      </Form.Item>

      <Form.Item
        label="Number Plate Type"
        name="numberPlateType"
        rules={[
          { required: true, message: "Please select the number plate type!" },
        ]}
      >
        <Select placeholder="Select Number Plate Type">
          <Select.Option value="commercial">Commercial</Select.Option>
          <Select.Option value="private">Private</Select.Option>
        </Select>
      </Form.Item>

      {/* Penalty Reduction */}
      <Form.Item
        label="Penalty Reduction"
        name="penaltyReduction"
        rules={[
          { required: true, message: "Please enter penalty reduction amount!" },
        ]}
      >
        <InputNumber
          placeholder="Enter Penalty Reduction (if any)"
          style={{ width: "100%" }}
        />
      </Form.Item>

      {/* Type of Vehicle Registered */}
      <Form.Item
        label="Type of Vehicle Registered"
        name="vehicleType"
        rules={[
          { required: true, message: "Please select the type of vehicle!" },
        ]}
      >
        <Select placeholder="Select Type of Vehicle">
          <Select.Option value="truck">Truck</Select.Option>
          <Select.Option value="salonCar">Salon Car</Select.Option>
        </Select>
      </Form.Item>

      {/* Starting & Expiring Date */}
      <Form.Item
        label="Registration Period"
        name="registrationPeriod"
        rules={[
          {
            required: true,
            message: "Please select the start and expiry date!",
          },
        ]}
      >
        <RangePicker style={{ width: "100%" }} />
      </Form.Item>

      {/* Submit Button */}
      <Form.Item>
        <div className="">
          <Button className="w-full" type="primary" htmlType="submit" block>
            Submit
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default VehicleRegistrationForm;
