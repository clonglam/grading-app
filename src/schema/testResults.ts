import * as z from "zod";

import { Static, Type } from "@sinclair/typebox";

/**
 * @swagger
 * components:
 *   schemas:
 *     TestResult:
 *       type: object
 *       required:
 *          result
 *          studentId
 *          graderId
 *          testId
 *       properties:
 *         result:
 *           type: number
 *         studentId:
 *           type: number
 *         garderId:
 *           type: number
 *         testId:
 *           type: number
 *
 */

const payload = {
    body: z.object({
        result: z
            .number({
                required_error: "Test Result is required.",
            })
            .min(0, "Test Result should larger than 0.")
            .max(100, "Test Result should small than 100."),
        studentId: z.string({
            required_error: "StudentId is required.",
        }),
        graderId: z.string({
            required_error: "graderId is required",
        }),
        testId: z.string({
            required_error: "testId is required",
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

export const createTestResultSchema = z.object({
    ...payload,
});

export const updateTestResultSchema = z.object({
    ...payload,
    ...params,
});

export const deleteTestResultSchema = z.object({
    ...params,
});

export const getTestResultSchema = z.object({
    ...params,
});

export type CreateTestResultInput = z.TypeOf<typeof createTestResultSchema>;
export type UpdateTestResultInput = z.TypeOf<typeof updateTestResultSchema>;
export type GetTestResultInput = z.TypeOf<typeof getTestResultSchema>;
export type DeleteTestResultInput = z.TypeOf<typeof deleteTestResultSchema>;
