const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

router.post("/signup", authController.signup.post);

<<<<<<< HEAD
router.post("/login", authController.signup.post);
=======
router.post("/login", authController.login.post);
>>>>>>> a53a0f18798b850556bd29733bc28c524215eb46

router.get("/me", (req, res) => {});

module.exports = router;
