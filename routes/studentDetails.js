var express = require("express");
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var studentController = require("../controllers/userController");

// a simple test url to check that all of our files are communicating correctly.
// router.get("/get/:id", product_controller.test);

router.get("/", (req, res) => {
  res.status(404).json({ text: "Not found" });
});

// router.get("/login", studentController.studentLogin);

// router.post("/create", studentController.studentCreate);

// router.get("/:id", studentController.studentGet);

// router.put("/update/:id", studentController.studentUpdate);

// router.delete("/delete/:id", studentController.studentDelete);

module.exports = router;
