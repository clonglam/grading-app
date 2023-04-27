import {
    CreateGenreInput,
    DeleteGenreInput,
    GetGenresInput,
    UpdateGenreInput,
} from "../schema/genre"
import { Request, Response } from "express"
import { Genre } from "@prisma/client"
import { GetGenreInput } from "../schema/genre"
import {
    createGenre,
    deleteGenre,
    getGenre,
    getGenres,
    updateGenre,
} from "../services/genre.services"

export async function createGenreHandler(
    req: Request<{}, {}, CreateGenreInput["body"]>,
    res: Response
) {
    try {
        const genre = await createGenre(req.body)
        return res.send(genre)
    } catch (err) {
        return res.sendStatus(400)
    }
}

export async function getGenresHandler(
    req: Request<{}, {}, GetGenresInput["query"]>,
    res: Response
) {
    try {
        const genres = await getGenres(req)
        return res.send(genres)
    } catch (err) {
        return res.sendStatus(400)
    }
}

export async function getGenreHandler(
    req: Request<GetGenreInput["params"], {}, {}>,
    res: Response<Genre | null>
) {
    try {
        const genre = await getGenre(req.params)
        return res.send(genre)
    } catch (err) {
        return res.sendStatus(400)
    }
}

export async function updateGenreHandler(
    req: Request<UpdateGenreInput["params"], UpdateGenreInput["body"]>,
    res: Response<Genre>
) {
    try {
        const genre = await updateGenre(req.params, req.body)
        return res.send(genre)
    } catch (err) {
        return res.sendStatus(400)
    }
}

export async function deleteGenreHandler(
    req: Request<DeleteGenreInput["params"]>,
    res: Response
) {
    try {
        const genre = await deleteGenre(req.params)
        return res.send(genre)
    } catch (err) {
        return res.sendStatus(400)
    }
}
