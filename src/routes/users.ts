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

const router = express.Router();

router.post("/", validateResource(createUserSchema), createUserHandler);
router.get("/:id", validateResource(getUserSchema), getUserHandler);
router.put("/:id", validateResource(updateUserSchema), updateUserHandler);

export default router;
