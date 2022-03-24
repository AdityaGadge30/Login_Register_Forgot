const { Login , Register , Dashboard , ForgotPass , ResetPass} = require("../Controller/User_Controller");
const auth = require("../Controller/auth");

const router = require("express").Router();


router.post("/register", Register);
router.post("/login", Login);
router.post("/reset_pass", ForgotPass);
router.post("/new_pass", ResetPass);
router.post("/dash", auth , Dashboard);

module.exports = router;