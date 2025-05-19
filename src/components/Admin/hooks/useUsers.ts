
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { User } from "../../../types";


export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const snapshot = await getDocs(collection(db, "users"));
          const usersData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as User[];
          setUsers(usersData);
        } catch (error) {
          console.error("Error fetching users:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUsers();
    }, []);
  
    return { users, loading };
  };