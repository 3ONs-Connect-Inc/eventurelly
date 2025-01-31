import { Route, Routes } from "react-router-dom"
import Admin from "./section/Admin"
import CAdmin from "./section/CAdmin"
import UserRoutes from "./section/User"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminRoute, CAdminRoute } from "./components/RoleRoute";


function App() {

  return (
    <>
    <ToastContainer position="bottom-right" autoClose={4000} closeOnClick />
   
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
