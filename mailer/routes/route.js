const router = require("express").Router();

const { signup, getBill } = require("../controller/appController.js");

router.post("/user/signup", signup);
router.post("/product/bill", getBill);

module.exports = router;
