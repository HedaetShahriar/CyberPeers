import axios from "axios";
import {type User } from "firebase/auth";

const saveUserInDB = async (
  user: User,
  userData: {
    name: string;
    email: string;
    image?: string;
  }
) => {
  const token = await user.getIdToken();
  await axios.post(`${import.meta.env.VITE_API_URL}/user`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
export default saveUserInDB;
