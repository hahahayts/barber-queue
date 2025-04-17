"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache"; // Optional if you want to refresh the page

export const removeQueue = async (id: string) => {
  try {
    await prisma.queue.delete({
      where: { id },
    });

    // Optional: Revalidate the homepage or any path where queue data is shown
    revalidatePath("/");

    return {
      message: "User removed from the queue",
      success: true,
    };
  } catch (error) {
    console.error("Failed to remove user from queue:", error);

    return {
      message: "Something went wrong while removing the user.",
      success: false,
    };
  }
};
