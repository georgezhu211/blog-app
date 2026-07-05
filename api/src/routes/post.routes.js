const { Router } = require("express");

const controller = require("../controllers/post.controller");
const { validatePost } = require("../validators/post.validation");
const { handleValidation } = require("../middleware/validation.middleware");

const router = Router();

router.get("/", controller.list);

router.get("/:id", controller.get);

router.post("/", validatePost, handleValidation, controller.create);

router.put("/:id", validatePost, handleValidation, controller.update);

router.delete("/:id", controller.remove);

module.exports = router;
