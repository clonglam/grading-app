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
    deleteCourseEnrollmentSchema,
    getCourseEnrollmentSchema,
} from "../schema/courseEnrollment";
import {
    createCourseEnrollmentHandler,
    deleteCourseEnrollmentHandler,
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
router.delete(
    "/:userId/course",
    validateResource(deleteCourseEnrollmentSchema),
    deleteCourseEnrollmentHandler
);
router.post(
    "/",
    validateResource(createCourseEnrollmentSchema),
    createUserHandler
);
router.get("/", validateResource(getCourseEnrollmentSchema), getUserHandler);
router.delete(
    "/:id",
    validateResource(deleteCourseEnrollmentSchema),
    deleteCourseEnrollmentHandler
);
router.get("/:id", validateResource(getUserSchema), getUserHandler);
router.put("/:id", validateResource(updateUserSchema), updateUserHandler);
router.delete("/:id", validateResource(updateUserSchema), updateUserHandler);

export default router;
