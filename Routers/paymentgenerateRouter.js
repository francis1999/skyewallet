const router = require('express').Router();
const { paymentgenerate, Deletepaymentgenerate, searchPaymentID } = require("../Controllers/generatepaymentidController");
const { verifyToken } = require("../middle/authentication");




router.post('/paymentgenerates', verifyToken, paymentgenerate);
router.delete('/deletepaymentid/:id', verifyToken, Deletepaymentgenerate);
router.get('/searchPaymentID', verifyToken, searchPaymentID);





module.exports = router;
