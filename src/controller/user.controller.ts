import { Prisma } from "@prisma/client";
import {
    createUser,
    deleteUser,
    getUser,
    updateUser,
} from "../service/user.service";
import {
    CreateUserInput,
    DeleteUserInput,
    GetUserInput,
    UpdateUserInput,
} from "./../schema/users";
import { Request, Response } from "express";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user path
 * /users/{userId}:
 *   post:
 *     summary: Create a user (and optionally associate with courses)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *
 */

export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response
) {
    try {
        const user = await createUser(req.body);
        return res.send(user);
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (err.code === "P2002") {
                console.log(
                    "There is a unique constraint violation, a new user cannot be created with this email"
                );
                return res.send(500);
            }
        } else {
            return res.send(500);
        }
    }
}

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *
 */

export async function getUserHandler(
    req: Request<GetUserInput["params"]>,
    res: Response
) {
    const id = req.params.id;

    const data = parseInt(id);
    if (!data || Number.isNaN(data)) return res.sendStatus(404);
    // throw new Error("invalid id");
    const user = await getUser(req.params);

    if (!user) return res.sendStatus(404);

    return res.send(user);
}

/**
 * @swagger
 * /users/{userId}:
 *    put:
 *     summary: Update a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The Updated User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *
 */

export async function updateUserHandler(
    req: Request<UpdateUserInput["params"], {}, UpdateUserInput["body"]>,
    res: Response
) {
    const update = req.body;

    const user = await getUser(req.params);

    if (!user) {
        return res.sendStatus(404);
    }

    const updatedProduct = await updateUser(req.params, update);

    return res.send(updatedProduct);
}

/**
 * @swagger
 * /users/{userId}:
 *    delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The Deleted User.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *
 */

export async function deleteUserHandler(
    req: Request<DeleteUserInput["params"], {}, {}>,
    res: Response
) {
    const user = await getUser(req.params);

    if (!user) {
        return res.sendStatus(404);
    }

    const deletedUser = await deleteUser(req.params);

    return res.send(deletedUser);
}
