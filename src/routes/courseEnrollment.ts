import express from "express";
import { createCourseEnrollmentHandler } from "../controller/courseEnrollment.controller";
import validateResource from "../middleware/validateResource";
import { createCourseEnrollmentSchema } from "./../schema/courseEnrollment";

const router = express.Router();

router.post(
    "/",
    validateResource(createCourseEnrollmentSchema),
    createCourseEnrollmentHandler
);

export default router;
