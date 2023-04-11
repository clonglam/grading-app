import { Request, Response } from "express";
import { CreateCourseInput } from "./../schema/courses";
import { createCourse } from "../service/course.services";

export async function createCourseHandler(
    req: Request<{}, {}, CreateCourseInput["body"]>,
    res: Response
) {
    try {
        const user = await createCourse(req.body);
        return res.send(user);
    } catch (err) {
        return res.send(500);
    }
}
