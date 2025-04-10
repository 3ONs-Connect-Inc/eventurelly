import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "../redux";
import { auth, db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { User } from "../../types";
import { removeActiveUser, setActiveUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom"; // 🔁 Add this

const useAuthListener = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // 🔁 For redirect

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userRef = doc(db, "users", firebaseUser.uid);
          const userSnapshot = await getDoc(userRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data() as User;

            // 🔁 Check emailVerified flag
            if (!userData.emailVerified) {
              navigate("/2fa-auth");
              return;
            }

            dispatch(setActiveUser(userData));
          } else {
            dispatch(removeActiveUser());
            console.warn("No user data found in Firestore");
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
          dispatch(removeActiveUser());
        }
      } else {
        dispatch(removeActiveUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);
};

export default useAuthListener;
