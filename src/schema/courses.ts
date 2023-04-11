import { createCourseEnrollmentSchema } from "./courseEnrollment";
import { UserRole } from "@prisma/client";
import * as z from "zod";
import { createTestResultSchema } from "./testResults";
import { createTestSchema } from "./tests";

/**
 * @swagger
 * components:
 *   schemas:
 *     Courses:
 *       type: object
 *       required:
 *          id
 *          name
 *
 *       properties:
 *         id:
 *           type: interger
 *         name:
 *           type: string
 *         courseDetails:
 *           type: string
 *         tests:
 *           type: Array
 *           items:
 *              $ref: "#/components/schemas/Test"
 *         members:
 *           type: Array
 *           items:
 *              $ref: "#/components/schemas/CourseEnrollment"
 */

const payload = {
    body: z.object({
        name: z.string({ required_error: "Name is required" }),
        courseDetails: z
            .string({
                required_error: "CourseDetails is required",
            })
            .optional(),
    }),
};

const params = {
    params: z.object({
        userId: z.string({
            required_error: "user ID is required",
        }),
    }),
};

export const getCourseSchema = z.object({
    ...params,
});

export const createCourseSchema = z.object({
    ...payload,
});

export const updateCourseSchema = z.object({
    ...payload,
    ...params,
});

export const deleteCourseSchema = z.object({
    ...params,
    ...payload,
});

export type GetCourseInput = z.TypeOf<typeof getCourseSchema>;
export type CreateCourseInput = z.TypeOf<typeof createCourseSchema>;
export type UpdateCourseInput = z.TypeOf<typeof updateCourseSchema>;
export type DeleteCourseEnrollmentInput = z.TypeOf<typeof deleteCourseSchema>;
