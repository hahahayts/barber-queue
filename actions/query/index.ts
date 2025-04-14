"use server";

import prisma from "@/lib/prisma";

export const getAllQueue = async () => {
  try {
    const queue = await prisma.queue.findMany();

    return queue;
  } catch (error) {
    console.error(error);
    return [];
  }
};
