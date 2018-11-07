var express = require("express");
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var classAndSectionController = require("../controllers/classAndSectionController");

// a simple test url to check that all of our files are communicating correctly.
// router.get("/get/:id", product_controller.test);

router.get("/", (req, res) => {
  res.status(404).json({ text: "Not found" });
});

router.post("/create", classAndSectionController.classAndSectionCreate);

router.get("/getAll", classAndSectionController.classAndSectionGetAll)

router.get("/:id", classAndSectionController.classAndSectionGet);

router.put("/update/:id", classAndSectionController.classAndSectionUpdate);

router.delete("/delete/:classAndSectionId", classAndSectionController.classAndSectionDelete);

module.exports = router;
