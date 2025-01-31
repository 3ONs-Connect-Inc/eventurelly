import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { useAppDispatch, useAppSelector } from './redux'; 
import { setActiveUser, removeActiveUser } from '../redux/slices/userSlice';
import { User } from '../types';
import { doc, getDoc } from 'firebase/firestore';

const useAuthListener = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const activeUser = useAppSelector(state => state.user.activeUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Check if user is already set in Redux
        if (!activeUser) {
          // Fetch complete user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data() as User;

            // Merge firstName and lastName, and companyContact and phoneNumber
            const updatedUserData = {
              ...userData,
              fullName: `${userData.firstName} ${userData.lastName}`.trim(),
              contactDetails: `${userData.companyContact} ${userData.phoneNumber}`.trim(),
            };

            dispatch(setActiveUser(updatedUserData));
          } else {
            // Default data if Firestore data is unavailable
            const defaultUserData: User = {
              id: currentUser.uid,
              firstName: currentUser.displayName || '',
              lastName:  '',
              emailUsername: '',
              emailDomain: '',
              companyName: '',
              companyContact: '',
              phoneNumber: '',
              email: currentUser.email || '',
              password: '',
              confirmPassword: '',
              ageConfirmed: true,
              contactInfo: '',
              role: "User",
              timestamp: new Date(),
              emailVerified: currentUser.emailVerified || false,
            };

            // Merge firstName and lastName, and companyContact and phoneNumber for default data
            const updatedDefaultUserData = {
              ...defaultUserData,
              fullName: `${defaultUserData.firstName} ${defaultUserData.lastName}`.trim(),
              contactDetails: `${defaultUserData.companyContact} ${defaultUserData.phoneNumber}`.trim(),
            };

            dispatch(setActiveUser(updatedDefaultUserData));
          }
        }
      } else {
        dispatch(removeActiveUser());
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [dispatch, activeUser]);

  return { loading, user: activeUser };
};

export default useAuthListener;
