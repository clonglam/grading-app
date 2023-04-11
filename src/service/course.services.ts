import { PrismaClient } from "@prisma/client";
import { databaseResponseTimeHistogram } from "../utils/metrics";
import { CreateCourseInput } from "../schema/courses";

const prisma = new PrismaClient();

export async function createCourse(input: CreateCourseInput["body"]) {
    const metricsLabels = {
        operation: "create Course",
    };

    const data = {
        ...input,
    };

    const timer = databaseResponseTimeHistogram.startTimer();

    try {
        const result = await prisma.course.create({
            data,
        });
        timer({ ...metricsLabels, success: "true" });
        return result;
    } catch (e) {
        timer({ ...metricsLabels, success: "false" });
        throw e;
    }
}
