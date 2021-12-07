const router = require('express').Router();
const { userregistration, userlogin } = require("../Controllers/userController");





router.post('/userregistration', userregistration);
router.post('/userlogin', userlogin);




module.exports = router;
