import { error } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

async function verifyUser(token: string) {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/auth/verify-email",
      {},
      {
        withCredentials: true,
        params: {
          token,
        },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Email Verification failed"
      );
    }
    throw new Error("An unexpected error occurred");
  }
}

export const useHandleEmailVerification = () => {
  return useMutation({
    mutationFn: verifyUser,
    onSuccess: (data: { message: string }) => {
      console.log(data);
      
      // toast
    },
    onError: (error: error) => {
      console.error("Email Verificaiton Error:", error.message);
      //toast
    },
  });
};
