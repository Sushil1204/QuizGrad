import { Client, ID, Account, Avatars } from "appwrite";

const client = new Client();
const account = new Account(client);
const avatars = new Avatars(client);

export const appwriteConfig = {
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT,
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
};

client
  .setEndpoint(appwriteConfig?.endpoint)
  .setProject(appwriteConfig?.projectId);
export { account, ID, avatars };
