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

export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response
) {
    const body = req.body;

    try {
        const user = await createUser(body);
        if (!user) return res.sendStatus(404);
        return res.send(user);
    } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (err.code === "P2002") {
                console.log(
                    "There is a unique constraint violation, a new user cannot be created with this email"
                );
                return res.send(403);
            }
        } else {
            return res.send(402);
        }
    }
}

export async function getUserHandler(
    req: Request<GetUserInput["params"]>,
    res: Response
) {
    const id = req.params.id;

    const data = parseInt(id);
    if (!data || Number.isNaN(data)) return res.sendStatus(404);
    // throw new Error("invalid id");
    const user = await getUser({ id: data });

    if (!user) return res.sendStatus(404);

    return res.send(user);
}

export async function updateUserHandler(
    req: Request<UpdateUserInput["params"], {}, UpdateUserInput["body"]>,
    res: Response
) {
    const id = req.params.id;
    const update = req.body;

    const data = parseInt(id);
    if (!data || Number.isNaN(data)) return res.sendStatus(404);

    const user = await getUser({ id: data });

    if (!user) {
        return res.sendStatus(404);
    }

    const updatedProduct = await updateUser({ id }, update);

    return res.send(updatedProduct);
}

export async function deleteUserHandler(
    req: Request<DeleteUserInput["params"], {}, {}>,
    res: Response
) {
    const id = req.params.id;

    const data = parseInt(id);
    if (!data || Number.isNaN(data)) return res.sendStatus(402);

    const user = await getUser({ id: data });

    if (!user) {
        return res.sendStatus(404);
    }

    const updatedProduct = await deleteUser({ id });

    return res.send(updatedProduct);
}
