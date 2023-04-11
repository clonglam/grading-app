import { PrismaClient } from "@prisma/client";
import { CreateTestInput } from "../schema/tests";
import { databaseResponseTimeHistogram } from "../utils/metrics";

const prisma = new PrismaClient();

export async function createTest(
    { courseId }: CreateTestInput["params"],
    body: CreateTestInput["body"]
) {
    const metricsLabels = {
        operation: "createTest",
    };

    const data = {
        courseId: parseInt(courseId as string),
        ...body,
    };
    const timer = databaseResponseTimeHistogram.startTimer();

    try {
        if (Number.isNaN(data.courseId)) throw new Error("Invalid courseId.");

        const result = await prisma.test.create({ data });
        console.log("result", result);
        timer({ ...metricsLabels, success: "true" });
    } catch (err) {
        timer({ ...metricsLabels, success: "false" });
        throw err;
    }
}
