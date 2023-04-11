import * as z from "zod";

import { Static, Type } from "@sinclair/typebox";
import { TestResult } from "@prisma/client";
import { createTestResultSchema } from "./testResults";

/**
 * @swagger
 * components:
 *   schemas:
 *     Test:
 *       type: object
 *       required:
 *          name
 *          date
 *          updatedAt
 *          courseId
 *       properties:
 *         name:
 *           type: string
 *         date:
 *           type: string
 *         updatedAt:
 *           type: DateTime
 *
 */

export interface TestInput {
    id?: string;
    updatedAt: Date;
    name: string;
    testResult: Omit<TestResult, "id" | "createdAt">[];
}

const payload = {
    body: z.object({
        name: z.string({
            required_error: "Test Name is required",
        }),
        date: z.string({
            required_error: "Date is required",
        }),
        courseId: z.string({
            required_error: "CourseId is required",
        }),
        testResult: createTestResultSchema.shape.body.optional(),
    }),
};
const creatPayload = {
    body: z.object({
        name: z.string({
            required_error: "Test Name is required",
        }),
        date: z.string({
            required_error: "Date is required",
        }),
        testResult: createTestResultSchema.shape.body.optional(),
    }),
};

const createParams = {
    params: z.object({
        courseId: z.string({
            required_error: "courseId is required",
        }),
    }),
};
const params = {
    params: z.object({
        id: z.string({
            required_error: "test ID is required",
        }),
    }),
};

export const createTestSchema = z.object({
    ...creatPayload,
    ...createParams,
});

export const updateTestSchema = z.object({
    ...payload,
    ...params,
});

export const deleteTestSchema = z.object({
    ...params,
});

export const getTestSchema = z.object({
    ...params,
});

export type CreateTestInput = z.TypeOf<typeof createTestSchema>;
export type UpdateTestInput = z.TypeOf<typeof updateTestSchema>;
export type GetTestInput = z.TypeOf<typeof getTestSchema>;
export type DeleteTestInput = z.TypeOf<typeof deleteTestSchema>;
