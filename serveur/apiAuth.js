router = require("express").Router();
const authController = require("./controllers/authController");

//auth
router.post("/register", authController.signUp);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

module.exports = router;