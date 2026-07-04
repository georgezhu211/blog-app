const { Router } = require("express");

const controller = require("../controllers/post.controller");

const router = Router();

router.get("/", controller.list);

router.get("/:id", controller.get);

router.post("/", controller.create);

module.exports = router;
