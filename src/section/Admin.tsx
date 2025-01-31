import { lazy, Suspense } from "react";
import Spinner from "../components/Spinner";
import { Route, Routes } from "react-router-dom";
import RootLayout from "../pages/admin/Layout";
import NotFound from "../pages/NotFound";
import Error from "../pages/Error";

const HomePage = lazy(() => import("../pages/admin/Home"));

const Admin = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          {/* <Route path="settings" element={<Settings />} /> */}
          <Route path="error" element={<Error />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Admin;
