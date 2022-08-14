const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  getAllVideogames,
  getVideogameById,
} = require("../controllers/videogames.controllers");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", getAllVideogames);
router.get("/videogames/:idVideogame", getVideogameById);

module.exports = router;
