import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../firebase/auth";
import { removeActiveUser } from "../../redux/slices/userSlice";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {  
    try {
      await logoutUser();
      dispatch(removeActiveUser());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);  
    }
  };

  return { handleLogout };
};

export default useLogout;
