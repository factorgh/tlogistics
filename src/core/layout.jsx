import { MdLogout } from "react-icons/md";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "../components/sidebar";
import Wrapper from "../core/wrapper";

const Layout = () => {
  const navigate = useNavigate();

  // Correctly wrap the navigation logic in an arrow function
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("logged out successfully");
    navigate("/");
  };

  return (
    <div className="flex h-screen ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="w-full h-20 border-b shadow-xl flex justify-end hover:cursor-pointer">
          <div
            onClick={handleLogout}
            className="flex items-center justify-end p-4 "
          >
            <MdLogout size={20} className="text-blue-500" />
            <h5 className="text-sm font-bold mx-2 text-blue-500">Logout</h5>
          </div>
        </div>
        <Wrapper>
          <Outlet />
        </Wrapper>
      </div>
    </div>
  );
};

export default Layout;
