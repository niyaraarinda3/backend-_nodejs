const app = require("express");
const router = app.Router();
const handler = require("./handler");


router.get("/", handler.getProduct);

module.exports = router;