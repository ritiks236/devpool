"use server";

import prisma from "@/db";
import { auth } from "@/lib/auth";
import { Room } from "@prisma/client";

export const NewRoomAction = async (roomData: Omit<Room, "userId">) => {
  const session = await auth();

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    await prisma.room.create({
      data: {
        userId: session?.user?.id,
        ...roomData,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Room creation failed");
  }
};
