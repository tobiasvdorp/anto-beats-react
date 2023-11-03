import { ID } from "appwrite";
import { INewUser, ILoginCredentials } from "@/types";
import { account } from "./config";

export async function createUserAccount(user: INewUser) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    return newAccount;
  } catch (error) {
    console.error("Error in createUserAccount:", error);
    throw error; // Gooi de fout zodat deze kan worden opgevangen door de aanroepende code
  }
}

export async function loginUser(credentials: ILoginCredentials) {
  try {
    const session = await account.createEmailSession(
      credentials.email,
      credentials.password
    );
    return session;
  } catch (error) {
    console.log(error);
    return error;
  }
}
