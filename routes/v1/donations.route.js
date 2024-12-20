const express = require('express');
const  {sendDonation, requestDonations, getDonations, VerifyDonation} =  require('../../controller/donation.controller')
const router = express.Router();
const {DonationReqSchema} = require('../../middlewares/validate')
const getAuthenticated  = require("../../middlewares/auth");

const validateDonationEntry = (req, res, next) => {
    const { error } = DonationReqSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    next();  // If validation is successful, proceed to the next middleware
};



router.route('/:id/pay').post(getAuthenticated, sendDonation);
router.route('/:id/confirm-payment').get(VerifyDonation)
router.route('/request-donation').post(getAuthenticated,  validateDonationEntry, requestDonations  )

router.route('/all-donations').get(getAuthenticated, getDonations)

module.exports = router;