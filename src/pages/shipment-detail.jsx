import {
  Button,
  Card,
  Descriptions,
  Divider,
  Timeline,
  Typography,
} from "antd";
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
    trackingNumber,
    date,
    senderName,
    receiverName,
    from,
    to,
    currentLocation,
    status,
    paymentStatus,
    timelineEvents,
  } = shipment;

  return (
    <div style={{ minWidth: "800px", margin: "auto", padding: "20px" }}>
      <Card title={`Shipment Details - ${trackingNumber}`} bordered={false}>
        <Descriptions bordered column={2} size="middle">
          <Descriptions.Item label="Tracking Number">
            {trackingNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Date">{date}</Descriptions.Item>
          <Descriptions.Item label="Sender">{senderName}</Descriptions.Item>
          <Descriptions.Item label="Receiver">{receiverName}</Descriptions.Item>
          <Descriptions.Item label="From">{from}</Descriptions.Item>
          <Descriptions.Item label="To">{to}</Descriptions.Item>
          <Descriptions.Item label="Current Location">
            {currentLocation}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Typography.Text
              type={
                status === "Delivered"
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
          Shipment Timeline
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
              <Typography.Text type="secondary">{event.time}</Typography.Text>
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
