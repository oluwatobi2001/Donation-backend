const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { donationService } = require('../service');

const sendDonation = async(req, res) => {
    try {

   
    const payment =  await donationService.Donate(req.body);
    
    res.status(200).json(payment) }
    catch(err) {
        res.status(500).json(err)
    }
}
const VerifyDonation = async (req, res) => {
    try {
      // Extract the reference (or trxref) from the query parameters
      const { reference, trxref } = req.query;
  
      // Log the received reference to see what you get
      console.log('Received reference:', reference || trxref);
  
      if (reference || trxref) {
        const refToVerify = reference || trxref;
        const payment = await donationService.VerifyPayment(refToVerify); // Pass the reference to VerifyPayment
        console.log(payment);
        res.status(200).json(payment);
      } else {
        res.status(400).json({ error: 'No reference provided in the query parameters' });
      }
    } catch (err) {
      console.error('Error verifying payment:', err);
      res.status(500).json({ error: err.message || 'Internal server error' });
    }
  };
  


const requestDonations = async(req, res)=> {
    const user = await donationService.requestDonate(req);
    res.status(httpStatus.CREATED).send(user);
    
}
const getDonations = async(req, res) => {
    const donations = await donationService.getDonations();
    res.status(httpStatus.OK).send(donations)
}
module.exports = {sendDonation, requestDonations, getDonations, VerifyDonation}