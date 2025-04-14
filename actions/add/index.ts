"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const addToQueue = async (name: string) => {
  try {
    // Count how many customers are currently in the queue.
    const count = await prisma.queue.count();

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

    // Create a new queue entry with check_in_time and estimated_time.
    const q = await prisma.queue.create({
      data: {
        name,
        check_in_time,
        estimated_time,
      },
    });

    if (q) {
      alert(
        "You have been added to the queue. Average wait time: 15 minutes per customer."
      );
    }
  } catch (error) {
    console.error(error);
  } finally {
    // Refresh/revalidate the page's data.
    revalidatePath("/");
  }
};
