import {
    CreateMovieInput,
    DeleteMovieInput,
    GetMovieInput,
    GetMoviesInput,
    UpdateMovieInput,
} from "./../schema/movie"
import { Movie, PrismaClient } from "@prisma/client"
import { databaseResponseTimeHistogram } from "../utils/metrics"

const prisma = new PrismaClient()

export async function createMovie(input: CreateMovieInput["body"]) {
    const metricsLabels = {
        operation: "Create Movie",
    }

    const data = {
        ...input,
    }

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const result = await prisma.movie.create({
            data,
        })
        timer({ ...metricsLabels, success: "true" })
        return result
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })
        throw e
    }
}

export async function getMovie({ movieId }: GetMovieInput["params"]) {
    const metricsLabels = {
        operation: "Get Movie",
    }

    const data = {
        id: parseInt(movieId),
    }

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const movie = await prisma.movie.findFirst({
            where: data,
            include: { genre: true },
        })

        timer({ ...metricsLabels, success: "true" })

        return movie
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })
        throw e
    }
}

export async function getMovies({ query }: GetMoviesInput) {
    console.log("query", query)

    const metricsLabels = {
        operation: "Get Movies",
    }

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const result = await prisma.movie.findMany()
        timer({ ...metricsLabels, success: "true" })
        return result
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })
        throw e
    }
}

export async function deleteMovie({ movieId }: DeleteMovieInput["params"]) {
    const metricsLabels = {
        operation: "Delete Movie",
    }

    const data = {
        id: parseInt(movieId),
    }

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const result = await prisma.movie.findFirst({
            where: { ...data },
        })

        timer({ ...metricsLabels, success: "true" })

        return result
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })

        throw e
    }
}

export async function updateMovie(
    { movieId }: UpdateMovieInput["params"],
    body: UpdateMovieInput["body"]
) {
    const metricsLabels = {
        operation: "Update Movie",
    }
    const id = parseInt(movieId)

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const result = await prisma.movie.update({
            where: { id },
            data: body,
        })

        timer({ ...metricsLabels, success: "true" })

        return result
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })
        throw e
    }
}
