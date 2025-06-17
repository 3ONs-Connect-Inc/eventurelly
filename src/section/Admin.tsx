import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import RootLayout from "../pages/admin/Layout";
import NotFound from "../pages/NotFound";



const DashboardPage = lazy(() => import("../pages/admin/Home"));
const Events = lazy(() => import("../pages/admin/Events"));
const AddEvents = lazy(() => import("../pages/admin/AddEvents"));
const Settings = lazy(() => import("../components/Admin/Settings"));
//const ViewBookings = lazy(() => import("../pages/admin/ViewBookings"));
//const ViewUsers = lazy(() => import("../pages/admin/ViewUsers"));

const Admin = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<RootLayout />}>
       <Route index element={<DashboardPage />} />
         <Route path="/view-events" element={<Events />} />
         <Route path="/add-events" element={<AddEvents />} />
         <Route path="/events/:eventId" element={<AddEvents />} />
         <Route path="settings" element={<Settings />} />
         {/* <Route path="/view/bookings" element={<ViewBookings />}/> 
         <Route path="/view-users" element={<ViewUsers />}/>*/}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Suspense>
  );
};

export default Admin;
