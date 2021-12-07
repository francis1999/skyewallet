const router = require('express').Router();
const { paymentgenerate } = require("../Controllers/generatepaymentidController");





router.post('/paymentgenerates', paymentgenerate);





module.exports = router;
