import { error } from "@/types/auth";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

async function changePasswordUser({
  oldPassword,
  newPassword,
  token,
}: {
  oldPassword: string;
  newPassword: string;
  token: string;
}) {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/auth/change-password",
      { oldPassword, newPassword },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Password change failed"
      );
    }
    throw new Error("An unexpected error occurred");
  }
}

export const useHandleChangePassword = () => {
  return useMutation({
    mutationFn: changePasswordUser,
    onSuccess: () => {
      toast.success("Password Changed");
    },
    onError: (error: error) => {
      console.error("Error:", error.message);
    },
  });
};
