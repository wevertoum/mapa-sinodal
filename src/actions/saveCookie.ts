"use server";
import { cookies } from "next/headers";

async function saveCookie(name: string, value: string) {
  try {
    console.log("saving cookie", name, value);
    cookies().set(name, value, {
      maxAge: 60 * 60 * 24,
    });
  } catch (error) {
    console.error("Error saving cookie", error);
    return error;
  }
}

export default saveCookie;
