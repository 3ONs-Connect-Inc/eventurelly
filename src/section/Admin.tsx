import { lazy, Suspense,  } from "react";

import { Route, Routes } from "react-router-dom";
import RootLayout from "../pages/admin/Layout";
import NotFound from "../pages/NotFound";

const HomePage = lazy(() => import("../pages/admin/Home"));

const Admin = () => {
  return (

      <Routes>
        <Route path="/" element={<RootLayout />}>
        <Route index element={<Suspense fallback={<p>Loading...</p>}><HomePage /></Suspense>} />
          {/* <Route path="settings" element={<Settings />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

  );
};

export default Admin;
