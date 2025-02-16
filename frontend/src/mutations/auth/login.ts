import { LoginFormValues } from "@/schema/login-schema";
import { setToken } from "@/store/slices/access-token";
import { error, login } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

async function loginUser(credentials: LoginFormValues) {
  try {
    const { data } = await axios.post<login>(
      "http://localhost:8000/auth/login",
      credentials,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw new Error("An unexpected error occurred");
  }
}

export const useHandleLogin = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data: login) => {
      dispatch(setToken(data.accessToken));
      toast.success("Login Successful");
      router.replace("/");
    },
    onError: (error: error) => {
      console.error("Login Error:", error.message);
    },
  });
};
