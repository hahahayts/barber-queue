"use server";

import { auth } from "@clerk/nextjs/server";

export const redirectToSignIn = async () => {
  const { redirectToSignIn } = await auth();
  return redirectToSignIn();
};
