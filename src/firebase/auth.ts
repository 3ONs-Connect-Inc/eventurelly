import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config";


// export const registerUser = async (email: string, password: string) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       return userCredential;
//     } catch (error: any) {
//       throw new Error(error.message);
//     }
//   };

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
