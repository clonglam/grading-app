import {
    CreateMovieInput,
    DeleteMovieInput,
    GetMoviesInput,
    UpdateMovieInput,
} from "./../schema/movie"
import { Request, Response } from "express"
import { Genre, Movie } from "@prisma/client"
import { GetMovieInput } from "../schema/movie"
import {
    createMovie,
    deleteMovie,
    getMovie,
    getMovies,
    updateMovie,
} from "../services/movie.services"

export async function createMovieHandler(
    req: Request<{}, {}, CreateMovieInput["body"]>,
    res: Response
) {
    try {
        const movie = await createMovie(req.body)
        return res.send(movie)
    } catch (err) {
        return res.sendStatus(400)
    }
}

export async function getMoviesHandler(
    req: Request<{}, {}, GetMoviesInput["query"]>,
    res: Response
) {
    try {
        const moives = await getMovies(req)
        return res.send(moives)
    } catch (err) {
        return res.sendStatus(400)
    }
}

export async function getMovieHandler(
    req: Request<GetMovieInput["params"], {}, {}>,
    res: Response<(Movie & { genre: Genre }) | null>
) {
    try {
        const movie = await getMovie(req.params)
        return res.send(movie)
    } catch (err) {
        return res.sendStatus(400)
    }
}

export async function updateMovieHandler(
    req: Request<UpdateMovieInput["params"], UpdateMovieInput["body"], {}>,
    res: Response<Movie>
) {
    try {
        const movie = await updateMovie(req.params, req.body)
        return res.send(movie)
    } catch (err) {
        return res.sendStatus(400)
    }
}

export async function deleteMovieHandler(
    req: Request<DeleteMovieInput["params"]>,
    res: Response
) {
    try {
        const movie = await deleteMovie(req.params)
        return res.send(movie)
    } catch (err) {
        return res.sendStatus(400)
    }
}
