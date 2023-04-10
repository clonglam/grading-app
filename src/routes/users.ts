import express from "express";
import {
    createUserHandler,
    getUserHandler,
    updateUserHandler,
} from "../controller/user.controller";
import validateResource from "../middleware/validateResource";
import {
    createUserSchema,
    getUserSchema,
    updateUserSchema,
} from "../schema/users";
import {
    createCourseEnrollmentSchema,
    getCourseEnrollmentSchema,
} from "../schema/courseEnrollment";
import {
    createCourseEnrollmentHandler,
    getCourseEnrollmentHandler,
} from "../controller/courseEnrollment.controller";

const router = express.Router();

router.get(
    "/:userId/course",
    validateResource(getCourseEnrollmentSchema),
    getCourseEnrollmentHandler
);
router.post(
    "/:userId/course",
    validateResource(createCourseEnrollmentSchema),
    createCourseEnrollmentHandler
);
router.post("/", validateResource(createUserSchema), createUserHandler);
router.get("/", validateResource(getUserSchema), getUserHandler);
router.get("/:id", validateResource(getUserSchema), getUserHandler);
router.put("/:id", validateResource(updateUserSchema), updateUserHandler);
router.delete("/:id", validateResource(updateUserSchema), updateUserHandler);

export default router;
