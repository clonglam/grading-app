import express from "express"
import {
    createGenreHandler,
    deleteGenreHandler,
    getGenreHandler,
    getGenresHandler,
    updateGenreHandler,
} from "../controller/genre.controller"
import validateResource from "../middleware/validateResource"
import {
    createGenreSchema,
    deleteGenreSchema,
    getGenreSchema,
    getGenresSchema,
} from "../schema/genre"

const router = express.Router()

router.get("/:genreId", validateResource(getGenreSchema), getGenreHandler)

router.get("/", validateResource(getGenresSchema), getGenresHandler)

router.post("/", validateResource(createGenreSchema), createGenreHandler)

router.put("/:movieId", updateGenreHandler)

router.delete(
    "/:movieId",
    validateResource(deleteGenreSchema),
    deleteGenreHandler
)

export default router
