const router = require('express').Router();
const { userregistration } = require("../Controllers/userController");





router.post('/userregistration', userregistration);




module.exports = router;
