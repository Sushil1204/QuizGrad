import axios from "axios";
import { account, ID } from "./config";

export async function createNewUser({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    const newAccount = await account.create(
      ID?.unique(),
      email,
      password,
      name
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

const ai21Api = axios.create({
  baseURL: "https://api.ai21.com/studio/v1",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_AI21STUDIO_API_KEY}`,
  },
});
export const generateQuiz = async (options: any) => {
  const response = await ai21Api.post("/chat/completions", {
    model: "jamba-1.5-mini",
    messages: [
      {
        role: "user",
        content: `You are a quiz generator. Generate 10 multiple-choice questions about these topics: ${options.join(
          ", "
        )}. 
        Format your response as a JSON array where each question object has this exact structure:
        {
          "id": "q1",
          "question": "What is the question?",
          "options": [
            { "id": "a", "text": "Option A" },
            { "id": "b", "text": "Option B" },
            { "id": "c", "text": "Option C" },
            { "id": "d", "text": "Option D" }
          ],
          "answer": "The correct option text",
          "hint": "A helpful hint"
        }`,
      },
    ],
    max_tokens: 4096,
    n: 1,
    top_p: 1,
    temperature: 0.7,
  });

  try {
    const content = response.data.choices[0].message.content.trim();
    // Remove any non-JSON characters
    const cleanContent = content.replace(/```json|```|\n|\r/g, "");

    // Attempt to parse, if fails, try to fix common JSON issues
    try {
      return JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Initial parsing failed, attempting to fix JSON");
      // Try to fix common JSON formatting issues
      const fixedContent = cleanContent
        .replace(/\s+/g, " ")
        .replace(/,\s*}/g, "}")
        .replace(/,\s*\]/g, "]")
        .trim();
      console.log(JSON.parse(fixedContent));
      return JSON.parse(fixedContent);
    }
  } catch (error) {
    console.error("Failed to parse quiz response:", error);
    console.error("Raw content:", response.data.choices[0].message.content);
    throw new Error("Failed to generate quiz questions. Please try again.");
  }
};
