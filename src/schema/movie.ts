import * as z from "zod"

const movieBody = z.object({
    title: z.string({ required_error: "Movie Title is required" }),
    numberInStock: z
        .number({
            required_error: "Number In Storck is required",
        })
        .min(0, "Number in Stock should larger than 0.")
        .max(999, "Number in Stock should smaller than 999."),
    dailyRentalRate: z
        .number({
            required_error: "Daily Rental Rate is required",
        })
        .min(0, "Daily Rental Rate should in range 1-5.")
        .max(5, "Daily Rental Rate should in range 1-5."),
    genreId: z.number({
        required_error: "Movie genre is required.",
    }),
})
const payload = {
    body: movieBody,
}

const params = {
    params: z.object({
        movieId: z.string({
            required_error: "Movie id is required.",
        }),
    }),
}

const query = {
    query: z.object({
        page: z.optional(z.number({})),
    }),
}

export const getMovieSchema = z.object({
    ...params,
})

export const getMoviesSchema = z.object({
    ...query,
})

export const createMovieSchema = z.object({
    ...payload,
})

export const updateMovieSchema = z.object({
    body: movieBody.partial(),
    ...params,
})

export const deleteMovieSchema = z.object({
    ...params,
    ...payload,
})

export type GetMovieInput = z.TypeOf<typeof getMovieSchema>
export type GetMoviesInput = z.TypeOf<typeof getMoviesSchema>
export type CreateMovieInput = z.TypeOf<typeof createMovieSchema>
export type UpdateMovieInput = z.TypeOf<typeof updateMovieSchema>
export type DeleteMovieInput = z.TypeOf<typeof deleteMovieSchema>
