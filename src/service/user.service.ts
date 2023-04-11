import {
    DeleteUserInput,
    GetUserInput,
    UpdateUserInput,
    UserInput,
} from "./../schema/users";

import { Prisma, PrismaClient } from "@prisma/client";
import { databaseResponseTimeHistogram } from "../utils/metrics";

const prisma = new PrismaClient();

export async function createUser(input: UserInput) {
    const metricsLabels = {
        operation: "createUser",
    };

    const data = {
        ...input,
        social: input.social as Prisma.JsonObject,
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

export async function getUser({ id }: GetUserInput["params"]) {
    const metricsLabels = {
        operation: "getUser",
    };

    const timer = databaseResponseTimeHistogram.startTimer();

    try {
        const data = { id: parseInt(id) };

        if (!data.id || Number.isNaN(data.id))
            return new Error("Please enter a valid userid");
        const result = await prisma.user.findUnique({
            where: { ...data },
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
