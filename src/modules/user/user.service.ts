import { prisma } from "../../lib/prisma";


const createUser = async (payload:any) => {

    const user = await prisma.user.create({
        data: payload
    });

    return user;
};


const getUsers = async () => {

    const users = await prisma.user.findMany();

    return users;
};


export const userService = {
    createUser,
    getUsers
};