var express = require("express");
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var userDetailController = require("../controllers/userController");

// a simple test url to check that all of our files are communicating correctly.
// router.get("/get/:id", product_controller.test);

router.get("/", (req, res) => {
  res.status(404).json({ text: "Not found" });
});

router.get("/login", userDetailController.userLogin);

// router.post("/create", userDetailController.userCreate);

// router.get("/:id", userDetailController.userGet);

// router.put("/:id/update", userDetailController.userUpdate);

// router.delete("/:id/delete", userDetailController.userDelete);

module.exports = router;
