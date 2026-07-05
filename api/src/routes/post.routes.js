const { Router } = require("express");

const controller = require("../controllers/post.controller");
const { validatePost } = require("../validators/post.validation");
const { handleValidation } = require("../middleware/validation.middleware");
const { validateId } = require("../validators/common.validation");

const router = Router();

router.get("/", controller.list);

router.get("/:id", validateId, handleValidation, controller.get);

router.post("/", validatePost, handleValidation, controller.create);

router.put(
  "/:id",
  validateId,
  validatePost,
  handleValidation,
  controller.update,
);

router.delete("/:id", validateId, handleValidation, controller.remove);

module.exports = router;
