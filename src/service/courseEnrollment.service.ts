import {
    CreateCourseEnrollmentInput,
    GetCourseEnrollmentInput,
} from "./../schema/courseEnrollment";
import { databaseResponseTimeHistogram } from "../utils/metrics";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createCourseEnrollment(
    { userId }: CreateCourseEnrollmentInput["params"],
    { courseId, ...rest }: CreateCourseEnrollmentInput["body"]
) {
    const metricsLabels = {
        operation: "createCourseEnrollment",
    };

    const data = {
        courseId: parseInt(courseId as string),
        userId: parseInt(userId as string),
        ...rest,
    };

    const timer = databaseResponseTimeHistogram.startTimer();

    try {
        if (Number.isNaN(data.userId) || Number.isNaN(data.courseId))
            throw new Error("userID or courseId should be number.");

        const result = await prisma.courseEnrollment.create({ data });
        timer({ ...metricsLabels, success: "true" });
        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: "false" });
        throw e;
    }
}
export async function getCourseEnrollment({
    userId,
}: GetCourseEnrollmentInput["params"]) {
    const metricsLabels = {
        operation: "getCourseEnrollment",
    };

    const data = {
        userId: parseInt(userId as string),
    };

    const timer = databaseResponseTimeHistogram.startTimer();

    try {
        if (Number.isNaN(data.userId))
            throw new Error("userID should be number.");

        const result = await prisma.user.findUnique({
            where: { id: data.userId },
            include: { courses: true },
        });

        timer({ ...metricsLabels, success: "true" });
        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: "false" });
        throw e;
    }
}
