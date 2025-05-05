import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import RootLayout from "../pages/admin/Layout";
import NotFound from "../pages/NotFound";


const DashboardPage = lazy(() => import("../pages/admin/Home"));
const Events = lazy(() => import("../pages/admin/Events"));



const Admin = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<RootLayout />}>
       <Route index element={<DashboardPage />} />
         <Route path="/events" element={<Events />} />
       <Route path="/reports" element={<Events />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </Suspense>
  );
};

export default Admin;
