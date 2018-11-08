var express = require("express");
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var studentController = require("../controllers/studentController");

// a simple test url to check that all of our files are communicating correctly.
// router.get("/get/:id", product_controller.test);

router.get("/", (req, res) => {
  res.status(404).json({ text: "Not found" });
});

router.post("/create", studentController.studentCreate);

router.get("/get/:studentId", studentController.studentGet);

router.get("/getStudentOfClassAndSection/:classAndSectionId", studentController.getStudentOfClassAndSection);

router.put("/update/:id", studentController.studentUpdate);

router.delete("/delete/:studentId", studentController.studentDelete);

module.exports = router;
