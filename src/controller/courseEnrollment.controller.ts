import {
    CreateCourseEnrollmentInput,
    GetCourseEnrollmentInput,
} from "./../schema/courseEnrollment";
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
} from "../schema/users";
import { Request, Response } from "express";
import {
    createCourseEnrollment,
    getCourseEnrollment,
} from "../service/courseEnrollment.service";

export async function createCourseEnrollmentHandler(
    req: Request<
        CreateCourseEnrollmentInput["params"],
        {},
        CreateCourseEnrollmentInput["body"]
    >,
    res: Response
) {
    try {
        const enrolledCourse = await createCourseEnrollment(
            req.params,
            req.body
        );
        return res.send(enrolledCourse);
    } catch (err) {
        return res.send(500);
    }
}

export async function getCourseEnrollmentHandler(
    req: Request<GetCourseEnrollmentInput["params"]>,
    res: Response
) {
    const user = await getCourseEnrollment(req.params);

    if (!user) return res.sendStatus(404);

    return res.send(user);
}

// export async function updateUserHandler(
//     req: Request<UpdateUserInput["params"], {}, UpdateUserInput["body"]>,
//     res: Response
// ) {
//     const id = req.params.id;
//     const update = req.body;

//     const data = parseInt(id);
//     if (!data || Number.isNaN(data)) return res.sendStatus(404);

//     const user = await getUser({ id: data });

//     if (!user) {
//         return res.sendStatus(404);
//     }

//     const updatedProduct = await updateUser({ id }, update);

//     return res.send(updatedProduct);
// }

// export async function deleteUserHandler(
//     req: Request<DeleteUserInput["params"], {}, {}>,
//     res: Response
// ) {
//     const id = req.params.id;

//     const data = parseInt(id);
//     if (!data || Number.isNaN(data)) return res.sendStatus(402);

//     const user = await getUser({ id: data });

//     if (!user) {
//         return res.sendStatus(404);
//     }

//     const deletedUser = await deleteUser({ id });

//     return res.send(deletedUser);
// }
