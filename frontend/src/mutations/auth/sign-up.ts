import { SignUpFormValues } from "@/schema/sign-up-schema";
import { error } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

async function registerUser(credentials: SignUpFormValues) {
  try {
    console.log(credentials);

    const { data } = await axios.post<{ message: string }>(
      "http://localhost:8000/auth/register",
      credentials,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Registeration failed");
    }
    throw new Error("An unexpected error occurred");
  }
}

export const useHandleSignUp = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data: { message: string }) => {
      console.log(data);
      toast.success("Registration Successful");
      router.replace("/auth/login");
    },
    onError: (error: error) => {
      console.error("registeration Error:", error.message);
    },
  }); 
};
