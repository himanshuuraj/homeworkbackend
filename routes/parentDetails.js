var express = require("express");
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var parentDetailController = require("./../controllers/parentController");

// a simple test url to check that all of our files are communicating correctly.
// router.get("/get/:id", product_controller.test);

router.get("/", (req, res) => {
  res.status(404).json({ text: "Not found" });
});

router.post("/login", parentDetailController.parentLogin);

router.post("/create", parentDetailController.parentCreate);

router.get("/:id", parentDetailController.parentGet);

router.put("/:id/update", parentDetailController.parentUpdate);

router.delete("/:id/delete", parentDetailController.parentDelete);

module.exports = router;
