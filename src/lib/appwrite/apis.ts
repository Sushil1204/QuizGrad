import { INewUser } from "@/interfaces";
import { account, ID } from "./config";

export async function createNewUser(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID?.unique(),
      user?.email,
      user?.password,
      user?.name
    );

    if (!newAccount) throw Error;

    return newAccount;
  } catch (error) {
    return error;
  }
}

export async function loginUser(user: { email: string; password: string }) {
  try {
    const session = await account.createEmailPasswordSession(
      user?.email,
      user?.password
    );

    if (!session) throw Error;
    return session;
  } catch (error) {
    console.log(error);
  }
}

export const getCurrentAccount = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    return currentAccount;
  } catch (error) {}
};

export const logoutAccount = async () => {
  try {
    const currentAccount = await account.deleteSession("current");

    if (!currentAccount) throw Error;
    return currentAccount;
  } catch (error) {}
};

export const verifyUser = async () => {
  try {
    const result = await account.createVerification(
      "http://localhost:5173/" // url
    );

    if (!result) throw Error;

    return result;
  } catch (error) {}
};

export const updateVerifyUser = async ({
  userId,
  secret,
}: {
  userId: string;
  secret: string;
}) => {
  try {
    const result = await account.updateVerification(userId, secret);

    if (!result) throw Error;

    return result;
  } catch (error) {}
};
