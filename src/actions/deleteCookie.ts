"use server";
import { cookies } from "next/headers";

async function deleteCookie(name: string) {
  try {
    cookies().delete(name);
  } catch (error) {
    return error;
  }
}

export default deleteCookie;
