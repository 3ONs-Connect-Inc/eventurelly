
import { Route, Routes, useLocation } from "react-router-dom";
import NotFound from '../pages/NotFound';
import Navbar from "../components/navbar/Navbar";
import { lazy} from "react";
import usePasswordReset from "../hooks/auth/usePasswordReset";


const Home  = lazy(() => import("../pages/Home"));  
const CreateAccount  = lazy(() => import("../pages/auth/CreateAccount"));
const SignInAccount  = lazy(() => import("../pages/auth/SignInAccount"));
const TwoFactorAuth  = lazy(() => import("../pages/auth/TwoFactorAuth"));
const VerifyEmail = lazy(() => import("../pages/auth/VerifyEmail"));
const PasswordReset  = lazy(() => import("../pages/auth/PasswordReset"));
const PasswordSuccess  = lazy(() => import("../pages/auth/PasswordSuccess"));
const SearchPage = lazy(() => import("../pages/SearchPage"));
const TeamBuildingPage = lazy(() => import("../pages/TeamBuildingPage"));
const EventCategoryPage = lazy(() => import("../pages/events/EventCategoryPage"));
const DemoRequest = lazy(() => import('../pages/DemoRequestPage'));
const BookEventPage = lazy(() => import('../pages/events/BookEventPage'));

const UserRoutes= () => { 
  const location = useLocation();
  const hideNavbarRoutes = ["/sign-in",   
    "/sign-up"
  ];

  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);
  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    errors,
    setErrors,
    message,
    setMessage,
    loading,
    setLoading,
    searchParams,
    handlePasswordReset,
} = usePasswordReset();

const handleNewPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handlePasswordReset();
};

  return (
    <>
          {shouldShowNavbar && <Navbar />}
      <Routes>
         <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignInAccount />} />  
        <Route path="/sign-up" element={<CreateAccount />} />
        <Route path="/2fa-auth" element={<TwoFactorAuth />} />
        <Route path="/verify-email" element={<VerifyEmail 
               handleNewPasswordSubmit={handleNewPasswordSubmit}
          setNewPassword={setNewPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          errors={errors}
          setErrors={setErrors}
          message={message}  
          setMessage={setMessage}  
          loading={loading}
          setLoading={setLoading}
          searchParams={searchParams}
        />} />
        <Route path="/forgot-password" element={<PasswordReset
          handleNewPasswordSubmit={handleNewPasswordSubmit}
          setNewPassword={setNewPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword} 
          errors={errors}
          setErrors={setErrors}    
          loading={loading}
          setLoading={setLoading}
          message={message}  
          setMessage={setMessage}
          searchParams={searchParams}
         />} />
        <Route path="/password-success" element={<PasswordSuccess />} />
        <Route path="/search" element={<SearchPage  />} />
        <Route path="/team-building-events" element={<TeamBuildingPage />} />
        <Route path="/demo-request" element={<DemoRequest />} />
        <Route path="/book-event/:collectionName/:id/:slug" element={<BookEventPage />} />
        <Route path="/edit-event/:collectionName/:id/:slug" element={<BookEventPage />} />
        <Route path="/event-details/:collectionName/:id/:slug" element={<EventCategoryPage/>} />
       
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default UserRoutes;