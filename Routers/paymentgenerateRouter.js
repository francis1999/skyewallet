const router = require('express').Router();
const { paymentgenerate, Deletepaymentgenerate } = require("../Controllers/generatepaymentidController");





router.post('/paymentgenerates', paymentgenerate);
router.delete('/deletepaymentid/:id', Deletepaymentgenerate);





module.exports = router;
