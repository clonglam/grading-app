import * as z from "zod"
import { createMovieSchema } from "./movie"

const payload = {
    body: z.object({
        label: z.string({ required_error: "Genre Label is required" }),
        slug: z.string({
            required_error: "Slug is required",
        }),
        movies: z.array(createMovieSchema.shape.body).optional(),
    }),
}

const params = {
    params: z.object({
        genreId: z.string({
            required_error: "Genre id is required.",
        }),
    }),
}

const query = {
    query: z.object({
        page: z.optional(z.number({})),
    }),
}

export const getGenreSchema = z.object({
    ...params,
})

export const getGenresSchema = z.object({
    ...query,
})

export const createGenreSchema = z.object({
    ...payload,
})

export const updateGenreSchema = z.object({
    ...payload,
    ...params,
})

export const deleteGenreSchema = z.object({
    ...params,
    ...payload,
})

export type GetGenreInput = z.TypeOf<typeof getGenreSchema>
export type GetGenresInput = z.TypeOf<typeof getGenresSchema>
export type CreateGenreInput = z.TypeOf<typeof createGenreSchema>
export type UpdateGenreInput = z.TypeOf<typeof updateGenreSchema>
export type DeleteGenreInput = z.TypeOf<typeof deleteGenreSchema>
