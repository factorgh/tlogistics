import {
  Button,
  Card,
  Descriptions,
  Divider,
  Timeline,
  Typography,
} from "antd";
import moment from "moment";
import {
  IoMdCheckmarkCircle,
  IoMdClose,
  IoMdEyeOff,
  IoMdTime,
} from "react-icons/io";
import { useLocation } from "react-router-dom";

const ShipmentDetailPage = () => {
  const { state } = useLocation();
  const shipment = state?.shipment;

  if (!shipment) {
    return <div>Shipment details not available.</div>;
  }

  const {
    delivery_date,
    vendor_memo_number,
    date,
    driver_name,
    pickup_person_name,
    pickup_address,
    delivery_address,
    driver_phone,
    status,
    paymentStatus,
  } = shipment;

  const timelineEvents = [
    {
      location: pickup_address,
      time: date,
      description: "Shipment picked up",
      status: "completed",
    },
    {
      location: "In transit",
      time: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      description: "In transit to destination",
      status: status === "IN_PROGRESS" ? "in-progress" : "completed",
    },
    {
      location: delivery_address,
      time: delivery_date,
      description: "Out for delivery",
      status: status === "Delivered" ? "completed" : "pending",
    },
  ];

  return (
    <div style={{ minWidth: "800px", margin: "auto", padding: "20px" }}>
      <Card title={`Shipment Details - ${vendor_memo_number}`} bordered={false}>
        <Descriptions bordered column={2} size="middle">
          <Descriptions.Item label="Tracking Number">
            {vendor_memo_number}
          </Descriptions.Item>
          <Descriptions.Item label="Date">
            {moment(date).format("YYYY-MM-DD")}
          </Descriptions.Item>
          <Descriptions.Item label="Sender">{driver_name}</Descriptions.Item>
          <Descriptions.Item label="Receiver">
            {pickup_person_name}
          </Descriptions.Item>
          <Descriptions.Item label="From">{pickup_address}</Descriptions.Item>
          <Descriptions.Item label="To">{delivery_address}</Descriptions.Item>
          <Descriptions.Item label="Contact">{driver_phone}</Descriptions.Item>
          <Descriptions.Item label="Status">
            <Typography.Text
              type={
                status === "IN_PROGRESS"
                  ? "success"
                  : status === "Delayed"
                  ? "warning"
                  : status === "Cancelled"
                  ? "danger"
                  : "secondary"
              }
            >
              {status}
            </Typography.Text>
          </Descriptions.Item>
          <Descriptions.Item label="Payment Status">
            {paymentStatus}
          </Descriptions.Item>
        </Descriptions>

        <Divider orientation="left" style={{ marginTop: 20 }}>
          Shipment Tracker
        </Divider>
        <Timeline mode="left" style={{ paddingLeft: 20 }}>
          {timelineEvents.map((event, index) => (
            <Timeline.Item
              key={index}
              color={event.status === "completed" ? "green" : "blue"}
              dot={
                event.status === "completed" ? (
                  <IoMdCheckmarkCircle style={{ fontSize: "16px" }} />
                ) : event.status === "in-progress" ? (
                  <IoMdTime style={{ fontSize: "16px" }} />
                ) : (
                  <IoMdClose style={{ fontSize: "16px" }} />
                )
              }
            >
              <Typography.Text strong>{event.location}</Typography.Text>
              <br />
              <Typography.Text type="secondary">
                {moment(event.time).format("YYYY-MM-DD")}
              </Typography.Text>
              <div>{event.description}</div>
            </Timeline.Item>
          ))}
        </Timeline>

        <Divider orientation="left" style={{ marginTop: 20 }}>
          Actions
        </Divider>
        <Button type="primary" style={{ marginRight: 10 }}>
          Track Shipment
        </Button>
        <Button type="default" icon={<IoMdEyeOff />}>
          Hide Shipment
        </Button>
      </Card>
    </div>
  );
};

export default ShipmentDetailPage;
