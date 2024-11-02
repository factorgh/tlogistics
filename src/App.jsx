import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./core/layout.jsx";
import CreateQuote from "./pages/create-quote.jsx";
import CreateShipment from "./pages/create-shipment.jsx";

import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./app/store.js";
import CustomerDetail from "./pages/customer-detail.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Diesel from "./pages/fuel-station/diesel.jsx";
import Gas from "./pages/fuel-station/gas.jsx";
import Petrol from "./pages/fuel-station/petrol.jsx";
import ListCustomers from "./pages/list-customers.jsx";
import ListQoutes from "./pages/list-quote.jsx";
import LoginPage from "./pages/login.jsx";
import FinancialAssets from "./pages/others/financial-assets.jsx";
import Insurance from "./pages/others/insurance.jsx";
import RentalsVehicle from "./pages/others/rentals-vehicle.jsx";
import VehicleRegistration from "./pages/others/vehicle-registration.jsx";
import PriceList from "./pages/price-list.jsx";
import ShipmentDetailPage from "./pages/shipment-detail.jsx";
import ShipmentUpdate from "./pages/shipment-update.jsx";
import Shipment from "./pages/shipment.jsx";
import SignUpPage from "./pages/sign-up.jsx";
import SingleStaff from "./pages/single-staff.jsx";
import StaffList from "./pages/staff-list.jsx";
import TransportBeverage from "./pages/transport/transport-beverage.jsx";
import TransportForklift from "./pages/transport/transport-forklift.jsx";
import TransportMcBerry from "./pages/transport/transport-mcberry.jsx";
import TransportPrivateCars from "./pages/transport/transport-private-cars.jsx";
import VendorExpenses from "./pages/vendor-expenses.jsx";
import VendorPayment from "./pages/vendor-payments.jsx";
import VendorsList from "./pages/vendors.jsx";
import Mechanic from "./pages/workshop/mechanic.jsx";
import Purchase from "./pages/workshop/purchase.jsx";

function App() {
  return (
    <div className="h-screen w-screen ">
      <Provider store={store}>
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} exact />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/main" element={<Layout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="create-shipment" element={<CreateShipment />} />
              <Route path="update-shipment" element={<ShipmentUpdate />} />

              <Route path="list-customer" element={<ListCustomers />} />
              <Route path="create-quote" element={<CreateQuote />} />
              <Route path="list-quotes" element={<ListQoutes />} />
              <Route path="shipment-list" element={<Shipment />} />
              <Route path="shipment-detail" element={<ShipmentDetailPage />} />
              <Route path="price-list" element={<PriceList />} />
              <Route path="vendor-list" element={<VendorsList />} />
              <Route path="vendor-expenses" element={<VendorExpenses />} />
              <Route path="vendor-payment" element={<VendorPayment />} />

              <Route path="staff-list" element={<StaffList />} />
              <Route path="customer-detail" element={<CustomerDetail />} />
              <Route path="staff-detail" element={<SingleStaff />} />
              <Route
                path="transport/beverage"
                element={<TransportBeverage />}
              />
              {/* Transport */}
              <Route
                path="transport/private-cars"
                element={<TransportPrivateCars />}
              />
              <Route path="transport/mcberry" element={<TransportMcBerry />} />
              <Route
                path="transport/forklift"
                element={<TransportForklift />}
              />
              {/* Workshop */}
              <Route path="workshop/mechanic" element={<Mechanic />} />
              <Route path="workshop/purchase" element={<Purchase />} />
              {/* Fuel Station */}
              <Route path="fuel-station/diesel" element={<Diesel />} />
              <Route path="fuel-station/petrol" element={<Petrol />} />
              <Route path="fuel-station/gas" element={<Gas />} />
              {/* others */}
              <Route
                path="others/rental-vehicles"
                element={<RentalsVehicle />}
              />
              <Route
                path="others/financial-assets"
                element={<FinancialAssets />}
              />
              <Route path="others/insurance" element={<Insurance />} />
              <Route
                path="others/vehicle-registration"
                element={<VehicleRegistration />}
              />
              <Route path="transport/mcberry" element={<TransportMcBerry />} />

              {/* Page not found */}
              <Route path="*" element={<div>Page Not Found</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
