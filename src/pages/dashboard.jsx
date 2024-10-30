import { Divider } from "antd";
import {
  MdCached,
  MdEngineering,
  MdGrading,
  MdJoinRight,
  MdOutlineAccountBalance,
  MdOutlineAccountBalanceWallet,
  MdOutlineCases,
  MdOutlineCommute,
  MdOutlineCompareArrows,
  MdOutlineDirectionsCar,
  MdOutlineGroup,
  MdOutlineLocalShipping,
  MdOutlinePayment,
  MdOutlinePayments,
  MdSettings,
  MdTrackChanges,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useGetShipmentsQuery } from "../app/services/shipment/shipment";
import { useGetVendorsQuery } from "../app/services/vendors/vendors";
import CustomAction from "../components/dashboard/custom-actions";
import DashboardItem from "../components/dashboard/dashboardItem";
import ResponsiveChartCard from "../components/dashboard/responsive-chart-card";
import ResponsivePieChartCard from "../components/dashboard/responsive-pie-chart";
import CustomHeader from "../core/custom-header";

import { useGetCustomersQuery } from "../app/services/customer/customer";
import { useGetRegistrationsQuery } from "../app/services/registration/registration";
import { useGetVendorsExpenseQuery } from "../app/services/vendor-expense/vendor-expense";
const Dashboard = () => {
  const navigate = useNavigate();

  // All data for dashboard statistics

  const { dat: vendors } = useGetVendorsQuery();
  const { data: shipments } = useGetShipmentsQuery();
  const { data: registrations } = useGetRegistrationsQuery();
  const { data: expenses } = useGetVendorsExpenseQuery();
  const { data: customers } = useGetCustomersQuery();
  console.log(shipments);

  console.log(
    `customers`,
    customers,
    `vendors`,
    vendors,

    `registrations`,
    registrations,
    `expenses`,
    expenses
  );
  return (
    <div className="bg-white w-full h-full p-5 border border-gray-200 rounded-md overflow-auto">
      <div className="w-full  flex justify-between items-center mb-5">
        <CustomHeader headerTitle={"Dashboard"} />
      </div>
      <div>
        <div className="grid grid-cols-6 gap-4">
          {/* <CustomAction
            color="primary"
            onClick={() => {
              navigate("/main/create-shipment");
            }}
            icon={<MdOutlineLocalShipping />}
            title="Create Shipment"
            bgColor={"#007bff"} // Blue
          />
          <CustomAction
            color="danger"
            onClick={() => {
              navigate("/main/add-customer");
            }}
            icon={<MdPersonAddAlt1 />}
            title="Create Customer"
            bgColor={"#dc3545"} // Red
          /> */}
          {/* <CustomAction
            color="#fa8c16"
            onClick={() => {
              navigate("/main/create-quote");
            }}
            icon={<MdOutlineContentPaste />}
            title="Create Quote"
            bgColor={"#28a745"} // Green
          />
          <CustomAction
            color="default"
            onClick={() => {
              navigate("/main/create-staff");
            }}
            icon={<FaPersonCirclePlus />}
            title="Create Staff"
            bgColor={"#6f42c1"} // Purple
          /> */}
          <CustomAction
            color="default"
            onClick={() => {
              navigate("/main/transport/beverage");
            }}
            icon={<MdTrackChanges />}
            title="Transport "
            bgColor={"#fd7e14"} // Orange
          />
          <CustomAction
            color="default"
            onClick={() => {
              navigate("/main/workshop/mechanic");
            }}
            icon={<MdSettings />}
            title="Workshop"
            bgColor={"#136f63"} // Yellow
          />
          <CustomAction
            color="default"
            onClick={() => {
              navigate("/main/fuel-station/petrol");
            }}
            icon={<MdCached />}
            title="Fuel Station"
            bgColor={"#17a2b8"} // Cyan
          />
          <CustomAction
            color="default"
            onClick={() => {
              navigate("/main/others/insurance");
            }}
            icon={<MdEngineering />}
            title="Insurance"
            bgColor={"#6610f2"} // Indigo
          />
          <CustomAction
            color="default"
            onClick={() => {
              navigate("/main/shipment-list");
            }}
            icon={<MdGrading />}
            title="Daily Operation"
            bgColor={"#20c997"} // Teal
          />
          <CustomAction
            color="default"
            onClick={() => {
              navigate("/main/others/vehicle-registration");
            }}
            icon={<MdJoinRight />}
            title="Registration"
            bgColor={"#e83e8c"} // Pink
          />
          <CustomAction
            color="default"
            onClick={() => {
              navigate("/main/others/rental-vehicles");
            }}
            icon={<MdOutlineCommute />}
            title="Rentals"
            bgColor={"#2d3047"}
          />
          <CustomAction
            color="default"
            onClick={() => {
              navigate("/main/others/financial-assets");
            }}
            icon={<MdOutlineCompareArrows />}
            title="Special Expenses"
            bgColor={"#fd7e12"}
          />
          <CustomAction
            color="default"
            onClick={() => {
              navigate("/main/others/financial-assets");
            }}
            icon={<MdOutlineCases />}
            title="Financial Assets"
            bgColor={"#003049"}
          />
        </div>
        <Divider />
      </div>
      {/* Card section  */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5 justify-center">
        <DashboardItem
          headerTitle={"Error"}
          headerText="Total Earnings"
          icon={<MdOutlinePayment size={50} className="text-slate-300" />}
          text="GHC 4.5k"
        />
        <DashboardItem
          headerText="Total Shipments"
          icon={<MdOutlineLocalShipping size={50} className="text-slate-300" />}
          text={shipments?.shipments.length.toString()}
        />
        <DashboardItem
          headerText="Pending Delivery"
          headerTitle={"Warning"}
          icon={<MdOutlineLocalShipping size={50} className="text-slate-300" />}
          text="10"
        />
        <DashboardItem
          headerText="Total Vehicles"
          icon={<MdOutlineDirectionsCar size={50} className="text-slate-300" />}
          text={registrations?.vehicleRegistration.length.toString()}
        />
        <DashboardItem
          headerText="Upcoming Expenses"
          headerTitle={"Error"}
          icon={<MdOutlinePayments size={50} className="text-slate-300" />}
          text={expenses?.venderExpense.length.toString()}
        />
        <DashboardItem
          headerText="Total Customers"
          icon={<MdOutlineGroup size={50} className="text-slate-300" />}
          text={customers?.customers.length.toString()}
        />
        <DashboardItem
          headerText="Pending Payments"
          headerTitle={"Success"}
          icon={
            <MdOutlineAccountBalance size={50} className="text-slate-300" />
          }
          text="GHC 2.5k"
        />
        <DashboardItem
          headerText="This Financial Year Earnings"
          icon={
            <MdOutlineAccountBalanceWallet
              size={50}
              className="text-slate-300"
            />
          }
          text="GHC 4.5k"
        />
      </div>

      {/* Chart section */}
      <div className="w-full mt-5 mb-5 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Chart taking 2/3 of the grid on medium and larger screens */}
        <div className="md:col-span-2">
          <ResponsiveChartCard />
        </div>

        {/* Pie chart taking 1/3 of the grid on medium and larger screens */}
        <div className="md:col-span-1">
          <ResponsivePieChartCard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
