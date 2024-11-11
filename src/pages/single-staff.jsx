import { Button, Card, Divider, Spin, Typography } from "antd";
import { useLocation } from "react-router-dom";
import { useGetSingleStaffQuery } from "../app/services/staff/staff";

const { Title, Text } = Typography;

const SingleStaff = () => {
  const location = useLocation();
  const { staffId } = location.state || {};

  // Fetch the staff details using the staffId
  const { data, isFetching, error } = useGetSingleStaffQuery(staffId);

  // Logging for debugging
  console.log(`Staff ID: ${staffId}`); // Replace with your actual staffId);
  console.log(data);

  // Handle loading state
  if (isFetching) return <Spin />;

  // Handle error state
  if (error) {
    return <div>Error loading staff details.</div>;
  }

  // If data is available, display the staff details
  return (
    <Card className=" rounded-xl p-6 ">
      <div className="grid grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="col-span-1 flex flex-col items-center p-6  rounded-lg shadow-lg ">
          <img
            src={data?.profilePicture || "/images/profile.png"}
            className="h-32 w-32 rounded-full object-cover mb-4 shadow-md"
            alt={data?.user.name || "Staff Member"}
          />
          <Title level={3} className="text-gray-800">
            {data?.user.name || "Unknown"}
          </Title>
          <Button
            type="primary"
            shape="round"
            style={{ backgroundColor: "#1CC88A", borderColor: "#1CC88A" }}
            className="mt-2 mb-4"
          >
            {data?.user.status || "Active"}
          </Button>
          <Divider />

          <div className="text-center">
            <Title level={5} className="text-gray-700">
              Email
            </Title>
            <Text className="text-gray-600">
              {data?.user.email || "No email provided."}
            </Text>
          </div>
        </div>

        {/* Staff Details Section */}
        <div className="col-span-2 p-6 bg-white rounded-lg shadow-lg ">
          <Title level={3} className="text-gray-800 mb-3">
            Staff Details
          </Title>
          <Divider />
          <div className="space-y-4 text-gray-700">
            <p>
              <Text strong>Position:</Text> {data?.user.position || "N/A"}
            </p>
            <p>
              <Text strong>Starting Date:</Text>{" "}
              {data?.user.start_date
                ? new Date(data?.user.start_date).toLocaleDateString()
                : "N/A"}
            </p>
            <p>
              <Text strong>Username:</Text> {data?.user.username || "N/A"}
            </p>
            <p>
              <Text strong>Emergency Contact:</Text>{" "}
              {data?.user.emergency_name || "N/A"} (
              {data?.user.emergency_number || "N/A"})
            </p>
            <p>
              <Text strong>ID Card:</Text> {data?.user.id_card_type || "N/A"} -{" "}
              {data?.user.license || "N/A"}
            </p>
            <p>
              <Text strong>ID Card Number:</Text>{" "}
              {data?.user.id_card_number || "N/A"}
            </p>
            <p>
              <Text strong>Phone Number:</Text> {data?.user.phone || "N/A"}
            </p>
            <p>
              <Text strong>Address:</Text> {data?.user.address || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SingleStaff;
