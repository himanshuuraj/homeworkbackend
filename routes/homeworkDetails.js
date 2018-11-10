var express = require("express");
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var homeworkController = require("../controllers/homeworkController");

// a simple test url to check that all of our files are communicating correctly.
// router.get("/get/:id", product_controller.test);

router.post("/create", homeworkController.homeworkCreate);

router.get("/:id", homeworkController.homeworkGet);

router.put("/update/:id", homeworkController.homeworkUpdate);

router.delete("/delete/:homeworkId", homeworkController.homeworkDelete);

router.get("/get/teacher/:teacherId", homeworkController.homeworkGetByTeacher);

router.get("/classAndSectionId/:classAndSectionId", homeworkController.homeworkListByClassAndSection);

module.exports = router;
