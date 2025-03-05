import { lazy } from "react";

import { Route, Routes } from "react-router-dom";
import RootLayout from "../pages/cAdmin/Layout";
import NotFound from "../pages/NotFound";


const HomePage = lazy(() => import("../pages/cAdmin/Home"));

const CAdmin = () => {
  return (

      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          {/* <Route path="settings" element={<Settings />} /> */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

  );
};

export default CAdmin;
