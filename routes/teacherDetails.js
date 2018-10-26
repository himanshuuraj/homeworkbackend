var express = require("express");
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var teacherController = require("../controllers/userController");

// a simple test url to check that all of our files are communicating correctly.
// router.get("/get/:id", product_controller.test);

router.get("/", (req, res) => {
  res.status(404).json({ text: "Not found" });
});

router.post("/create", teacherController.teacherCreate);

router.get("/:id", teacherController.teacherGet);

router.put("/:id/update", teacherController.teacherUpdate);

router.delete("/:id/delete", teacherController.teacherDelete);

module.exports = router;
