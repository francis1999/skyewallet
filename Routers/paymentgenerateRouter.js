const router = require('express').Router();
const { paymentgenerate, Deletepaymentgenerate, searchPaymentID } = require("../Controllers/generatepaymentidController");





router.post('/paymentgenerates', paymentgenerate);
router.delete('/deletepaymentid/:id', Deletepaymentgenerate);
router.get('/searchPaymentID', searchPaymentID);





module.exports = router;
