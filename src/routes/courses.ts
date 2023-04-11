import { createCourseSchema } from "./../schema/courses";
import express from "express";
import validateResource from "../middleware/validateResource";
import { createTestResultSchema } from "../schema/testResults";
import { createTestHandler } from "../controller/test.controller";
import { createCourseHandler } from "../controller/course.controller";

const router = express.Router();

router.post("/", validateResource(createCourseSchema), createCourseHandler);

router.post(
    "/:courseId/tests",
    validateResource(createTestResultSchema),
    createTestHandler
);

export default router;
