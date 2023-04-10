import { UserRole } from "@prisma/client";
import * as z from "zod";

/**
 * @swagger
 * components:
 *   schemas:
 *     UserRole:
 *      type: string
 *      enum: [STUDENT, TEACHER]
 *
 *     CourseEnrollment:
 *       type: object
 *       required:
 *          role
 *          userId
 *          courseId
 *       properties:
 *         createAt:
 *           type: DateTime
 *         role:
 *           $ref: "#/components/schemas/UserRole"
 *         email:
 *           type: number
 *         userId:
 *          type: string
 *         courseId:
 *          type: string
 */

// export interface CourseEnrollmentInput {
//     role: UserRole;
//     userId: number;
//     courseId: number;
// }

const payload = {
    body: z.object({
        role: z.nativeEnum(UserRole),
        courseId: z.string({
            required_error: "CourseId is required",
        }),
    }),
};

const params = {
    params: z.object({
        userId: z.string({
            required_error: "user ID is required",
        }),
    }),
};

export const getCourseEnrollmentSchema = z.object({
    ...params,
});

export const createCourseEnrollmentSchema = z.object({
    ...payload,
    ...params,
});

export const updateCourseEnrollmentSchema = z.object({
    ...payload,
    ...params,
});

export const deleteCourseEnrollmentSchema = z.object({
    ...params,
});

export type GetCourseEnrollmentInput = z.TypeOf<
    typeof getCourseEnrollmentSchema
>;
export type CreateCourseEnrollmentInput = z.TypeOf<
    typeof createCourseEnrollmentSchema
>;
export type UpdateCourseEnrollmentInput = z.TypeOf<
    typeof updateCourseEnrollmentSchema
>;
export type DeleteCourseEnrollmentInput = z.TypeOf<
    typeof deleteCourseEnrollmentSchema
>;
