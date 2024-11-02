import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createNewUser,
  loginUser,
  getCurrentAccount,
  logoutAccount,
  verifyUser,
} from "../appwrite/apis";
import { INewUser } from "@/interfaces";

// Hook for creating a new account
export const useCreateAccount = () => {
  return useMutation({
    mutationKey: ["createAccount"],
    mutationFn: async (user: INewUser) => {
      const newUser = await createNewUser(user);
      if (newUser) {
        // Trigger verification after successfully creating the account
        await verifyUser();
      }
      return newUser;
    },
  });
};

// Hook for logging in a user
export const useLogin = () => {
  return useMutation({
    mutationKey: ["loginUser"],
    mutationFn: (user: { email: string; password: string }) => loginUser(user),
  });
};

// Hook for getting the current account
export const useCurrentAccount = () => {
  return useQuery({
    queryKey: ["currentAccount"],
    queryFn: () => getCurrentAccount(),
  });
};

// Hook for logging out a user
export const useLogout = () => {
  return useMutation({
    mutationKey: ["logoutAccount"],
    mutationFn: () => logoutAccount(),
  });
};
