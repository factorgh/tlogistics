import { Button, Divider, Spin } from "antd";
import { useLocation } from "react-router-dom";
import { useGetSingleStaffQuery } from "../app/services/staff/staff";
import Wrapper from "../core/wrapper";

const SingleStaff = () => {
  const location = useLocation();
  const { staffId } = location.state || {};

  // Check if staffId is available before making the query
  const { data, isFetching, error } = useGetSingleStaffQuery(staffId);

  // Logging for debugging
  console.log(staffId);
  console.log(data);

  // Handle loading state
  if (isFetching) return <Spin />;

  // Handle error state

  // If data is available, display the staff details
  return (
    <Wrapper>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-1 flex items-center justify-center flex-col border border-gray-300 rounded-md">
          <img
            src={data?.profilePicture || "/images/profile.png"}
            className="h-32 w-32 rounded-md"
            alt={data?.name || "Staff Member"}
          />
          <h5 className="mt-3 text-2xl font-bold mb-3">
            {data?.name || "Unknown"}
          </h5>
          <Button className="rounded-full bg-[#1CC88A] text-white">
            {data?.status || "Active"}
          </Button>
          <Divider />

          <div>
            <h3 className="mt-5">Email</h3>
            <p>{data?.email || "No email provided."}</p>
          </div>
        </div>
        <div className="col-span-2 border border-red-900 rounded-md bg-black h-56">
          {/* Placeholder for additional details */}
          <h3 className="text-white">Additional Details</h3>
          {/* Render additional details as needed */}
        </div>
      </div>
    </Wrapper>
  );
};

export default SingleStaff;
