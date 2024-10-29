import { Button, Card, Divider, Spin } from "antd";
import { useLocation } from "react-router-dom";
import { useGetSingleStaffQuery } from "../app/services/staff/staff";
import Wrapper from "../core/wrapper";

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
    <Wrapper>
      <Card className="shadow-md rounded-lg">
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-1 flex items-center justify-center flex-col border border-gray-300 rounded-md p-5 bg-white">
            <img
              src={data?.profilePicture || "/images/profile.png"}
              className="h-32 w-32 rounded-full object-cover"
              alt={data?.name || "Staff Member"}
            />
            <h5 className="mt-3 text-2xl font-bold mb-1">
              {data?.name || "Unknown"}
            </h5>
            <Button className="rounded-full bg-[#1CC88A] text-white">
              {data?.status || "Active"}
            </Button>
            <Divider className="my-3" />

            <div className="text-center">
              <h3 className="font-semibold">Email</h3>
              <p className="text-gray-600">
                {data?.email || "No email provided."}
              </p>
            </div>
          </div>
          <div className="col-span-2 border border-red-900 rounded-md bg-gray-50 p-5">
            <h3 className="text-lg font-semibold text-gray-800">
              Staff Details
            </h3>
            <Divider />
            <div className="space-y-3">
              <p>
                <strong>Position:</strong> {data?.position || "N/A"}
              </p>
              <p>
                <strong>Starting Date:</strong>{" "}
                {data?.start_date
                  ? new Date(data.start_date).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <strong>Username:</strong> {data?.username || "N/A"}
              </p>
              <p>
                <strong>Emergency Contact:</strong>{" "}
                {data?.emergency_name || "N/A"} (
                {data?.emergency_number || "N/A"})
              </p>
              <p>
                <strong>ID Card:</strong> {data?.id_card_type || "N/A"} -{" "}
                {data?.id_card_number || "N/A"}
              </p>
              <p>
                <strong>Phone Number:</strong> {data?.phone || "N/A"}
              </p>
              <p>
                <strong>Address:</strong> {data?.employee_address || "N/A"}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Wrapper>
  );
};

export default SingleStaff;
