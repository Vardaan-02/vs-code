import { error } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

async function forgotPasswordUser({ email }: { email: string }) {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/auth/forgot-password",
      { email },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Something went wrong");
    }
    throw new Error("An unexpected error occurred");
  }
}

export const useHandleForgotPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: forgotPasswordUser,
    onSuccess: (data: { message: string }) => {
      console.log(data);
      toast.success("Email Send");
      router.replace("/");
    },
    onError: (error: error) => {
      console.error("Error:", error.message);
    },
  });
};
