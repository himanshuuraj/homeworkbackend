var express = require("express");
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var studentAndHomework = require("../controllers/studentAndHomeworkController");

// a simple test url to check that all of our files are communicating correctly.
// router.get("/get/:id", product_controller.test);

router.post("/create", studentAndHomework.studentAndHomeworkCreate);

router.get("/:id", studentAndHomework.studentAndHomeworkGet);

router.put("/update/:id", studentAndHomework.studentAndHomeworkUpdate);

router.delete("/delete/:id", studentAndHomework.studentAndHomeworkDelete);

module.exports = router;
