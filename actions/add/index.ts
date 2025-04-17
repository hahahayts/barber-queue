"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { existingUser } from "../query";

export const addToQueue = async (id: string, name: string) => {
  try {
    // Count how many customers are currently in the queue.
    const count = (await prisma.queue.count()) + 1;

    // Set the current check-in time.
    const check_in_time = new Date();

    const timeAdded =
      count === 1
        ? check_in_time.getTime() + 15 * 60 * 1000
        : check_in_time.getTime() + count * 15 * 60 * 1000;

    // Calculate the estimated time based on the number of customers currently in the queue.
    // Assuming each customer adds 15 minutes waiting time.
    // The new customer waits for those already in the queue.
    const estimated_time = new Date(timeAdded);

    // Check if the user is already in the queue
    const existing = await existingUser(name);

    // console.log(existing);

    if (!existing) {
      // Create a new queue entry with check_in_time and estimated_time.
      await prisma.queue.create({
        data: {
          name,
          check_in_time,
          estimated_time,
        },
      });

      return {
        message: "You are added in the queue.",
      };
    }
    return {
      message: "You are already in the queue.",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Something went wrong!",
    };
  } finally {
    // Refresh/revalidate the page's data.
    revalidatePath("/");
  }
};
