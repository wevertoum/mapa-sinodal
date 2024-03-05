"use server";
import { cookies } from "next/headers";

async function saveCookie(name: string, value: string) {
  try {
    cookies().set(name, value, {
      maxAge: 60 * 60 * 24,
    });
  } catch (error) {
    return error;
  }
}

export default saveCookie;
