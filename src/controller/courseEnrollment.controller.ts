import { Request, Response } from "express";
import {
    createCourseEnrollment,
    deleteCourseEnrollment,
    getCourseEnrollment,
} from "../service/courseEnrollment.service";
import {
    CreateCourseEnrollmentInput,
    DeleteCourseEnrollmentInput,
    GetCourseEnrollmentInput,
} from "./../schema/courseEnrollment";

/**
 * @swagger
 * tags:
 *   name: CourseEnrollments
 *   description: Courses API
 * /users/{userId}/courses:
 *   post:
 *     summary: Enroll a user to a course (as student or teacher)
 *     tags: [CourseEnrollments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CourseEnrollment'
 *     responses:
 *       200:
 *         description: CourseEnrollment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseEnrollment'
 *       500:
 *         description: Some server error
 *
 */
export async function createCourseEnrollmentHandler(
    req: Request<
        CreateCourseEnrollmentInput["params"],
        {},
        CreateCourseEnrollmentInput["body"]
    >,
    res: Response
) {
    try {
        const enrolledCourse = await createCourseEnrollment(
            req.params,
            req.body
        );
        return res.send(enrolledCourse);
    } catch (err) {
        return res.send(500);
    }
}
/**
 * @swagger
 * tags:
 *   name: CourseEnrollments
 *   description: Courses API
 * /users/{userId}/courses:
 *   get:
 *     summary: Get a user's enrollement incourses
 *     tags: [CourseEnrollments]
 *
 *     responses:
 *       200:
 *         description: CourseEnrollment.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseEnrollment'
 *       500:
 *         description: Some server error
 *
 */
export async function getCourseEnrollmentHandler(
    req: Request<GetCourseEnrollmentInput["params"]>,
    res: Response
) {
    const user = await getCourseEnrollment(req.params);

    if (!user) return res.sendStatus(404);

    return res.send(user);
}

export async function deleteCourseEnrollmentHandler(
    req: Request<
        DeleteCourseEnrollmentInput["params"],
        {},
        DeleteCourseEnrollmentInput["body"]
    >,
    res: Response
) {
    const deletedUser = await deleteCourseEnrollment(req.params, req.body);

    return res.send(deletedUser);
}
