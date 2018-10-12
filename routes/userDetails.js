var express = require("express");
var router = express.Router();

// Require the controllers WHICH WE DID NOT CREATE YET!!
var userDetail_controller = require("../controllers/userController");

// a simple test url to check that all of our files are communicating correctly.
// router.get("/get/:id", product_controller.test);

router.get("/", (req, res) => {
  res.status(404).json({ text: "Not found" });
});

router.get("/login", userDetail_controller.login);

router.post("/create", userDetail_controller.user_create);

router.get("/:id", userDetail_controller.get_user);

router.put("/:id/update", userDetail_controller.user_update);

router.delete("/:id/delete", userDetail_controller.user_delete);

module.exports = router;
