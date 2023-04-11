import express from "express";
import validateResource from "../middleware/validateResource";
import { createTestResultSchema } from "../schema/testResults";
import { createTestHandler } from "../controller/test.controller";

const router = express.Router();

router.post(
    "/course/:courseId/tests",
    validateResource(createTestResultSchema),
    createTestHandler
);

export default router;
