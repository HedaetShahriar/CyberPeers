import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";
import { getIdToken } from "firebase/auth";

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, logOut, loading } = useAuth();

  // Create an Axios instance with a base URL
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  axiosInstance.interceptors.request.use(async (config) => {
    //Wait until Firebase Auth is fully loaded
    if (!loading && user) {
      const token = await getIdToken(user);
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (
        error?.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        logOut()
          .then(() => {
            console.error("Unauthorized access - user logged out");
            navigate("/login", { replace: true });
          })
          .catch((logoutError) => {
            console.error("Error during logout:", logoutError);
            navigate("/login", { replace: true });
          });
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxiosSecure;
