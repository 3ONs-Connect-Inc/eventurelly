import { Route, Routes } from "react-router-dom"
import Admin from "./section/Admin"
import CAdmin from "./section/CAdmin"
import UserRoutes from "./section/User"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminRoute, CAdminRoute } from "./components/RoleRoute";
import { IconError, IconInfo, IconSuccess, IconWarning } from "./components/Notification";


function App() {

  return (
    <>
       <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        icon={({ type }) => {
          if (type === "success") return <IconSuccess />;
          if (type === "error") return <IconError />;
          if (type === "warning") return <IconWarning />; 
          if (type === "info") return <IconInfo />; 
          else return null;
      }}
        style={{ zIndex: 9999 }} 
      />
   
    <Routes>
      {/* USER ROUTES */}
      <Route path="/*" element={<UserRoutes />} />

   {/* CORPORATE ADMIN ROUTES */}   
   <Route
        path="/cadmin/*"
        element={
          <CAdminRoute>
            <CAdmin />
          </CAdminRoute>
        }
      />

      {/* ADMIN ROUTES */}   
      <Route
        path="/admin/*"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />
    </Routes>
  </>
  )
}  

export default App
