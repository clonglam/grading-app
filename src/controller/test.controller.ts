import { Request, Response } from "express";
import { CreateTestInput } from "../schema/tests";
import { createTest } from "../service/test.services";

export async function createTestHandler(
    req: Request<CreateTestInput["params"], {}, CreateTestInput["body"]>,
    res: Response
) {
    try {
        const enrolledCourse = await createTest(req.params, req.body);
        return res.send(enrolledCourse);
    } catch (err) {
        return res.send(500);
    }
}

// export async function getCourseEnrollmentHandler(
//     req: Request<GetCourseEnrollmentInput["params"]>,
//     res: Response
// ) {
//     const user = await getCourseEnrollment(req.params);

//     if (!user) return res.sendStatus(404);

//     return res.send(user);
// }

// export async function deleteCourseEnrollmentHandler(
//     req: Request<
//         DeleteCourseEnrollmentInput["params"],
//         {},
//         DeleteCourseEnrollmentInput["body"]
//     >,
//     res: Response
// ) {
//     const deletedUser = await deleteCourseEnrollment(req.params, req.body);

//     return res.send(deletedUser);
// }
