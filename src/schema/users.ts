import { object, number, string, TypeOf } from "zod";
import { Static, Type } from "@sinclair/typebox";

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *          first_name
 *          last_name
 *          email
 *       properties:
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: number
 */

export interface UserInput {
    email: string;
    firstName: string;
    lastName: string;
    social?: Social;
}
export interface Social {
    facebook?: string;
    twitter?: string;
    github?: string;
    website?: string;
}

const payload = {
    body: object({
        firstName: string({
            required_error: "First Name is required",
        }),
        lastName: string({
            required_error: "Last Name is required",
        }),
        email: string({
            required_error: "Email is required",
        }).email("You should enter a email."),
        social: object({
            facebook: string().optional(),
            twitter: string().optional(),
            github: string().optional(),
            website: string().optional(),
        }).optional(),
    }),
};

const params = {
    params: object({
        id: string({
            required_error: "user ID is required",
        }),
    }),
};

export const createUserSchema = object({
    ...payload,
});

export const updateUserSchema = object({
    ...payload,
    ...params,
});

export const deleteUserSchema = object({
    ...params,
});

export const getUserSchema = object({
    ...params,
});

export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type UpdateUserInput = TypeOf<typeof updateUserSchema>;
export type GetUserInput = TypeOf<typeof getUserSchema>;
export type DeleteUserInput = TypeOf<typeof deleteUserSchema>;
