import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./config";



export const registerUser = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User registered successfully:", userCredential);
    return userCredential;
  } catch (error: any) {
    console.error("Error creating user:", error.message);
    throw new Error(error.message);
  }
};



export const loginUser = (email: string, password: string) => 
  signInWithEmailAndPassword(auth, email, password).then(res => res.user);



export const logoutUser = async () => {
  return signOut(auth);

};