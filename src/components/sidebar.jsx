import {
  AiFillDashboard,
  AiFillPayCircle,
  AiOutlineSafety,
  AiOutlineUnorderedList,
  AiOutlineUsergroupAdd,
  AiOutlineUsergroupDelete,
  AiTwotoneCar,
} from "react-icons/ai"; // React Icons
import {
  MdDashboard,
  MdEmojiTransportation,
  MdEngineering,
  MdOutlineAirportShuttle,
  MdOutlineCases,
  MdOutlineCommute,
  MdOutlineFormatColorFill,
  MdOutlinePayments,
  MdSettings,
} from "react-icons/md";
import { NavLink } from "react-router-dom";

// Dummy sidebar content with icons

const mainContent = [
  {
    label: "Dashboard",
    path: "/main/dashboard",
    icon: <AiFillDashboard size={20} />,
  },
  {
    label: "Create Shipment",
    path: "/main/create-shipment",
    icon: <MdDashboard size={20} />,
  },
];

const sideContent1 = [
  {
    label: "Customer List",
    path: "/main/list-customer",
    icon: <AiOutlineUsergroupAdd size={20} />,
  },
];
// const sideContent2 = [
//   {
//     label: "Create Quote",
//     path: "/main/create-quote",
//     icon: <AiOutlinePlus size={20} />,
//   },
//   {
//     label: "Quote List",
//     path: "/main/list-quotes",
//     icon: <AiOutlineRead size={20} />,
//   },
// ];
const sideContent3 = [
  {
    label: "Shipment List",
    path: "/main/shipment-list",
    icon: <AiOutlineSafety size={20} />,
  },
];
const sideContent4 = [
  {
    label: "Vendor List",
    path: "/main/vendor-list",
    icon: <AiOutlineUsergroupDelete size={20} />,
  },
  {
    label: "Vendor Expenses",
    path: "/main/vendor-expenses",
    icon: <AiOutlineUnorderedList size={20} />,
  },
  {
    label: "Vendor Payments",
    path: "/main/vendor-payment",
    icon: <AiFillPayCircle size={20} />,
  },
];
const sideContent5 = [
  {
    label: "Staff List",
    path: "/main/staff-list",
    icon: <AiOutlineUnorderedList size={20} />,
  },
];
const sideContent6 = [
  {
    label: "Transport Beverage",
    path: "/main/transport/beverage",
    icon: <MdEmojiTransportation size={20} />,
  },
  {
    label: "Transport McBerry",
    path: "/main/transport/mcberry",
    icon: <MdOutlineAirportShuttle size={20} />,
  },
  {
    label: " Private Cars",
    path: "/main/transport/private-cars",
    icon: <AiTwotoneCar size={20} />,
  },
];
const sideContent7 = [
  {
    label: "Mechanic",
    path: "/main/workshop/mechanic",
    icon: <MdSettings size={20} />,
  },
  {
    label: "Purchase",
    path: "/main/workshop/purchase",
    icon: <MdOutlinePayments size={20} />,
  },
];
const sideContent8 = [
  {
    label: "Petrol",
    path: "/main/fuel-station/petrol",
    icon: <MdOutlineFormatColorFill size={20} />,
  },
  {
    label: "Diesel",
    path: "/main/fuel-station/diesel",
    icon: <MdOutlineFormatColorFill size={20} />,
  },
  {
    label: "Gas",
    path: "/main/fuel-station/gas",
    icon: <MdOutlineFormatColorFill size={20} />,
  },
];
const sideContent9 = [
  {
    label: "Insurance",
    path: "/main/others/insurance",
    icon: <MdEngineering size={20} />,
  },
  {
    label: "Vehicle Registration",
    path: "/main/others/vehicle-registration",
    icon: <AiOutlineUnorderedList size={20} />,
  },
  {
    label: "Financial Assets",
    path: "/main/others/financial-assets",
    icon: <MdOutlineCases size={20} />,
  },
  {
    label: "Rental Vehicles",
    path: "/main/others/rental-vehicles",
    icon: <MdOutlineCommute size={20} />,
  },
];

const Sidebar = () => {
  // State to track active tab
  // const [activeTab, setActiveTab] = useState("/main/dashboard");

  return (
    <div className="w-56 h-screen overflow-scroll border-r shadow-sm  flex flex-col items-start px-4 flex-shrink-0 bg-[#4A6FDC]">
      <img src="/images/logo.png" alt="Logo" className="w-324 h-18 mb-3" />

      {/* Sidebar Items */}
      <div className="flex flex-col w-full mb-5">
        {/* Sidebar Menu Items */}
        <h2 className="text-sm font-bold mb-2  text-gray-300   mt-2">Main</h2>
        {mainContent.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            // onClick={() => setActiveTab(item.path)}
            className={({ isActive }) =>
              `flex items-center py-2 px-4  rounded-md mb-2 text-sm font-medium transition-colors 
              ${
                isActive
                  ? "bg-blue-200 text-blue-500 "
                  : "bg-transparent  text-white hover:bg-blue-200 hover:text-blue-700"
              }`
            }
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
        <h2 className="text-sm font-bold mb-2  text-gray-300  mt-2">
          Customer
        </h2>
        {sideContent1.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            // onClick={() => setActiveTab(item.path)}
            className={({ isActive }) =>
              `flex items-center py-2 px-4 rounded-md mb-2 text-sm font-medium transition-colors 
              ${
                isActive
                  ? "bg-blue-200 text-blue-500 "
                  : "bg-transparent  text-white hover:bg-blue-200 hover:text-blue-700"
              }`
            }
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
        {/* <h2 className="text-sm font-bold mb-2 text-gray-300 mt-2">Quote</h2>
        {sideContent2.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            // onClick={() => setActiveTab(item.path)}
            className={({ isActive }) =>
              `flex items-center py-2 px-4 rounded-md mb-2 text-sm font-medium transition-colors 
              ${
                isActive
                  ? "bg-blue-200 text-blue-500 "
                  : "bg-transparent  text-white hover:bg-blue-200 hover:text-blue-700"
              }`
            }
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </NavLink>
        ))} */}
        <h2 className="text-sm font-bold mb-2  text-gray-300  mt-2">
          Shipment
        </h2>
        {sideContent3.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            // onClick={() => setActiveTab(item.path)}
            className={({ isActive }) =>
              `flex items-center py-2 px-4 rounded-md mb-2 text-sm font-medium transition-colors 
              ${
                isActive
                  ? "bg-blue-200 text-blue-500 "
                  : "bg-transparent  text-white hover:bg-blue-200 hover:text-blue-700"
              }`
            }
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
        <h2 className="text-sm font-bold mb-2  text-gray-300  mt-2">Vendors</h2>
        {sideContent4.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            // onClick={() => setActiveTab(item.path)}
            className={({ isActive }) =>
              `flex items-center py-2 px-4 rounded-md mb-2 text-sm font-medium transition-colors 
              ${
                isActive
                  ? "bg-blue-200 text-blue-500 "
                  : "bg-transparent text-white hover:bg-blue-200 hover:text-blue-700"
              }`
            }
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
        <h2 className="text-sm font-bold mb-2  text-gray-300  mt-2">Staff</h2>
        {sideContent5.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            // onClick={() => setActiveTab(item.path)}
            className={({ isActive }) =>
              `flex items-center py-2 px-4 rounded-md mb-2 text-sm font-medium transition-colors 
              ${
                isActive
                  ? "bg-blue-200 text-blue-500 "
                  : "bg-transparent text-white hover:bg-blue-200 hover:text-blue-700"
              }`
            }
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
        <h2 className="text-sm font-bold mb-2  text-gray-300  mt-2">
          Transport{" "}
        </h2>
        {sideContent6.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            // onClick={() => setActiveTab(item.path)}
            className={({ isActive }) =>
              `flex items-center py-2 px-4 rounded-md mb-2 text-sm font-medium transition-colors 
              ${
                isActive
                  ? "bg-blue-200 text-blue-500 "
                  : "bg-transparent text-white hover:bg-blue-200 hover:text-blue-700"
              }`
            }
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
        <h2 className="text-sm font-bold mb-2  text-gray-300  mt-2">
          Workshop{" "}
        </h2>
        {sideContent7.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            // onClick={() => setActiveTab(item.path)}
            className={({ isActive }) =>
              `flex items-center py-2 px-4 rounded-md mb-2 text-sm font-medium transition-colors 
              ${
                isActive
                  ? "bg-blue-200 text-blue-500 "
                  : "bg-transparent text-white hover:bg-blue-200 hover:text-blue-700"
              }`
            }
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
        <h2 className="text-sm font-bold mb-2  text-gray-300  mt-2">
          Fuel Station{" "}
        </h2>
        {sideContent8.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            // onClick={() => setActiveTab(item.path)}
            className={({ isActive }) =>
              `flex items-center py-2 px-4 rounded-md mb-2 text-sm font-medium transition-colors 
              ${
                isActive
                  ? "bg-blue-200 text-blue-500 "
                  : "bg-transparent text-white hover:bg-blue-200 hover:text-blue-700"
              }`
            }
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
        <h2 className="text-sm font-bold mb-2  text-gray-300  mt-2">Others </h2>
        {sideContent9.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            // onClick={() => setActiveTab(item.path)}
            className={({ isActive }) =>
              `flex items-center py-2 px-4 rounded-md mb-2 text-sm font-medium transition-colors 
              ${
                isActive
                  ? "bg-blue-200 text-blue-500 "
                  : "bg-transparent text-white hover:bg-blue-200 hover:text-blue-700"
              }`
            }
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
