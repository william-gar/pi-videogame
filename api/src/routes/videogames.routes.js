const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  getAllVideogames,
  getVideogameById,
  postVideogame,
} = require("../controllers/videogames.controllers");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", getAllVideogames);
router.get("/videogames/:idVideogame", getVideogameById);
router.post("/videogames", postVideogame);

module.exports = router;
