import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createNewUser,
  loginUser,
  getCurrentAccount,
  logoutAccount,
  generateQuiz,
} from "../appwrite/apis";

// Hook for creating a new account
// Hook for creating a new account
export const useCreateAccount = () => {
  return useMutation({
    mutationKey: ["createAccount"],
    mutationFn: async ({
      email,
      password,
      name,
    }: {
      email: string;
      password: string;
      name: string;
    }) => {
      const newUser = await createNewUser({ email, password, name });
      return { newUser, password }; // Return both the newUser and password
    },
  });
};

// Hook for logging in a user
export const useLogin = () => {
  return useMutation({
    mutationKey: ["loginUser"],
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginUser({ email, password }),
  });
};

// Hook for getting the current account
export const useGetCurrentAccount = () => {
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

export const useGenerateQuizGame = () => {
  return useMutation({
    mutationKey: ["generateQuiz"],
    mutationFn: (options: any) => generateQuiz(options),
  });
};
