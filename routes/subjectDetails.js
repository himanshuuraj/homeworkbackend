var express = require("express");
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var subjectController = require("../controllers/subjectController");

// a simple test url to check that all of our files are communicating correctly.
// router.get("/get/:id", product_controller.test);

router.post("/create", subjectController.subjectCreate);

router.get("/getAll", subjectController.subjectGetAll);

router.get("/:id", subjectController.subjectGet);

router.get("/teacher/:teacherId", subjectController.teacherGetAll);

router.put("/update/:id", subjectController.subjectUpdate);

router.delete("/delete/:subjectId", subjectController.subjectDelete);

module.exports = router;
