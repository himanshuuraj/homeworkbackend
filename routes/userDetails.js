var express = require("express");
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var userDetail_controller = require("../controllers/userController");

// a simple test url to check that all of our files are communicating correctly.
// router.get("/get/:id", product_controller.test);

router.get("/", (req, res) => {
  res.status(404).json({ text: "Not found" });
});

router.get("/login", userDetail_controller.userLogin);

router.post("/create", userDetail_controller.userCreate);

router.get("/:id", userDetail_controller.userGet);

router.put("/:id/update", userDetail_controller.userUpdate);

router.delete("/:id/delete", userDetail_controller.userDelete);

module.exports = router;
