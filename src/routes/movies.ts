import { PrismaClient } from "@prisma/client"
import express from "express"
import {
    createMovieSchema,
    deleteMovieSchema,
    getMovieSchema,
    getMoviesSchema,
} from "./../schema/movie"

import {
    createMovieHandler,
    deleteMovieHandler,
    getMovieHandler,
    getMoviesHandler,
    updateMovieHandler,
} from "../controller/movie.controller"
import validateResource from "../middleware/validateResource"

const router = express.Router()

router.get("/:movieId", validateResource(getMovieSchema), getMovieHandler)

router.get("/", validateResource(getMoviesSchema), getMoviesHandler)

router.post("/", validateResource(createMovieSchema), createMovieHandler)

router.put("/:movieId", updateMovieHandler)

router.delete(
    "/:movieId",
    validateResource(deleteMovieSchema),
    deleteMovieHandler
)

export default router
