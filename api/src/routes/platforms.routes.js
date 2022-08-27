const { Router } = require("express");
const { getPlatforms } = require("../controllers/platforms.controllers");

const router = Router();

router.get("/platforms", getPlatforms);

module.exports = router;
