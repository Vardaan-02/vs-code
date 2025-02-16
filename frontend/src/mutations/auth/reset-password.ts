import { error, login } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

async function resetPasswordUser(credentials: {
  newPassword: string;
  token: string;
}) {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/auth/reset-password",
      credentials,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Some Error Occured");
    }
    throw new Error("An unexpected error occurred");
  }
}

export const useHandleResetPassword = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: resetPasswordUser,
    onSuccess: (data: login) => {
      console.log(data);
      toast.success("Password Reset Successful");
      router.replace("/");
    },
    onError: (error: error) => {
      console.error("Error:", error.message);
      if (error.message.toLowerCase().includes("expired"))
        toast.error("Expired Token");
    },
  });
};
