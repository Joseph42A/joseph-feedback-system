const router = require("express").Router();
const userController = require("../controller/userController.js");

router.route("/signup").post(userController.signup);
router.route("/login").post(userController.login);

router.route("/users").get(userController.getAllUsers);

module.exports = router;
