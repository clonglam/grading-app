import {
    CreateUserInput,
    DeleteUserInput,
    GetUserInput,
    UpdateUserInput,
    UserInput,
} from "./../schema/users";

import { databaseResponseTimeHistogram } from "../utils/metrics";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createUser(input: UserInput) {
    const metricsLabels = {
        operation: "createUser",
    };

    const data = {
        ...input,
        social: input.social && JSON.stringify(input.social),
    };

    const timer = databaseResponseTimeHistogram.startTimer();

    try {
        const result = await prisma.user.create({ data });
        timer({ ...metricsLabels, success: "true" });
        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: "false" });
        throw e;
    }
}

export async function getUser({ id }: { id: number }) {
    const metricsLabels = {
        operation: "getUser",
    };

    const timer = databaseResponseTimeHistogram.startTimer();

    try {
        const result = await prisma.user.findUnique({
            where: { id },
        });
        timer({ ...metricsLabels, success: "true" });
        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: "false" });
        throw e;
    }
}

export async function updateUser(
    { id }: UpdateUserInput["params"],
    update: UpdateUserInput["body"]
) {
    return await prisma.user.update({
        where: { id: parseInt(id) },
        data: {
            ...update,
        },
    });
}
export async function deleteUser({ id }: DeleteUserInput["params"]) {
    return await prisma.user.delete({
        where: { id: parseInt(id) },
    });
}
