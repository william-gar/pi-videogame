const { Router } = require("express");
const { getGenres } = require("../controllers/genres.controllers");

const router = Router();

router.get("/genres", getGenres);

module.exports = router;
