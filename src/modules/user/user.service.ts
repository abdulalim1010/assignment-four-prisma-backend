import bcrypt from "bcryptjs";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createUser = async (payload: any) => {
  const isUserExist = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });

  if (isUserExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      "User already exists"
    );
  }

  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: payload.role,

      profile: {
        create: {
          bio: "",
          photo: "",
          phone: "",
          address: "",
        },
      },
    },
    include: {
      profile: true,
    },
  });

  return user;
};

const getUsers = async () => {
  return prisma.user.findMany({
    include: {
      profile: true,
    },
  });
};

export const userService = {
  createUser,
  getUsers,
};