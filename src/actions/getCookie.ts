"use server";
import { cookies } from "next/headers";

async function getCookie(name: string): Promise<string> {
  try {
    const cookieStore = cookies();
    const data = cookieStore.get(name);
    return (data?.value || "") as string;
  } catch (error) {
    throw new Error(String(error));
  }
}

export default getCookie;
