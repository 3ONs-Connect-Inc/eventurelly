
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Event, User } from "../../../types";
import { auth, db } from "../../config";

// Function to check if a user is an admin
export const isAdmin = async (userId: string): Promise<boolean> => {
  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (!userDoc.exists()) return false;

    const userData = userDoc.data() as User;
    return userData.role === "Admin";
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

// Function to add an event to Firestore
export const addEvent = async (event: Event): Promise<boolean> => {
  const currentUser = auth.currentUser;

  if (!currentUser) {
    console.error("No authenticated user found.");
    return false;
  }

  const isUserAdmin = await isAdmin(currentUser.uid);
  if (!isUserAdmin) {
    console.error("Unauthorized: Only admins can add events.");
    return false;
  }

  try {
    await setDoc(doc(db, "events", event.id), event);
    console.log("Event added successfully.");
    return true;
  } catch (error) {
    console.error("Error adding event:", error);
    return false;
  }
};
