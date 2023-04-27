import {
    CreateGenreInput,
    DeleteGenreInput,
    GetGenreInput,
    GetGenresInput,
    UpdateGenreInput,
} from "./../schema/genre"
import { PrismaClient } from "@prisma/client"
import { databaseResponseTimeHistogram } from "../utils/metrics"

const prisma = new PrismaClient()

export async function createGenre(input: CreateGenreInput["body"]) {
    const metricsLabels = {
        operation: "Create Genre",
    }

    const { movies, ...rest } = input

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const result = await prisma.genre.create({
            data: {
                ...rest,
                movies: {
                    create: movies ? movies : [],
                },
            },
        })

        timer({ ...metricsLabels, success: "true" })
        return result
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })
        throw e
    }
}

export async function getGenre({ genreId }: GetGenreInput["params"]) {
    const metricsLabels = {
        operation: "Get Genre",
    }

    const data = {
        id: parseInt(genreId),
    }

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const genre = await prisma.genre.findFirst({
            where: data,
            include: { movies: true },
        })

        timer({ ...metricsLabels, success: "true" })

        return genre
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })
        throw e
    }
}

export async function getGenres({ query }: GetGenresInput) {
    console.log("query", query)

    const metricsLabels = {
        operation: "Get Genres",
    }

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const result = await prisma.genre.findMany({
            orderBy: [
                {
                    id: "asc",
                },
            ],
        })
        timer({ ...metricsLabels, success: "true" })
        return result
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })
        throw e
    }
}

export async function deleteGenre({ genreId }: DeleteGenreInput["params"]) {
    const metricsLabels = {
        operation: "Delete Genre",
    }

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const result = await prisma.genre.findFirst({
            where: { id: parseInt(genreId) },
        })

        timer({ ...metricsLabels, success: "true" })

        return result
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })

        throw e
    }
}

export async function updateGenre(
    { genreId }: UpdateGenreInput["params"],
    body: UpdateGenreInput["body"]
) {
    const metricsLabels = {
        operation: "Update Genre",
    }
    const id = parseInt(genreId)
    const { movies, ...rest } = body

    const timer = databaseResponseTimeHistogram.startTimer()

    try {
        const result = await prisma.genre.update({
            where: { id },
            data: {
                ...rest,
            },
        })

        timer({ ...metricsLabels, success: "true" })

        return result
    } catch (e) {
        timer({ ...metricsLabels, success: "false" })
        throw e
    }
}
