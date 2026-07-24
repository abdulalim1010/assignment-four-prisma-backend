import bcrypt from "bcryptjs";
import httpStatus from "http-status";

import { ILoginUser, IRegisterUser } from "./auth.interface";
import { prisma } from "../../lib/prisma";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import AppError from "../../errors/AppError";

const registerUser = async (payload: IRegisterUser) => {
  // Check existing user
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

  // Hash password
  const hashedPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds)
  );

  // Create User + Empty Profile
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

const loginUser = async (payload: ILoginUser) => {
  // Find user
  const user = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
    include: {
      profile: true,
    },
  });

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found"
    );
  }

  // Compare password
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      "Invalid credentials"
    );
  }

  // Create Access Token
  const accessToken = jwtUtils.createToken(
    {
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    config.jwt_access_secret,
    config.jwt_access_expires_in
  );

  return {
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      profile: user.profile,
    },
  };
};

export const AuthService = {
  registerUser,
  loginUser,
};