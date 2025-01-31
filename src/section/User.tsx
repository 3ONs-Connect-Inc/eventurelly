
import { Route, Routes, useLocation } from "react-router-dom";
//import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Error from "../pages/Error";
import GetStarted from "../pages/GetStarted";
import Navbar from "../components/Navbar";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";


const UserRoutes = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/sign-in", 
    "/sign-up"
  ];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/get-started" element={<GetStarted />} /> */}
         <Route path="/*" element={<GetStarted />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default UserRoutes;