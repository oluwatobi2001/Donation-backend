const httpStatus = require('http-status');
const db = require('../model/');
const ApiError = require('../utils/ApiError');
const axios = require('axios');

const Donation = db.donationModel;
const UserDonate =  db.UserdonationModel;
const User = db.user;

// Function to initialize a payment
const Donate = async (paymentDets) => {
  const { email, amount } = paymentDets;
  const callback_url = 'http://localhost:5000/v1/donations/confirm-payment/';

  try {
    // Step 1: Initialize payment with Paystack
    const response = await axios.post(
      process.env.INITIALIZE_PAYSTACK,
      {
        email,
        amount,
        callback_url,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_API}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Payment Initialized:', response.data);

    // Step 2: Extract the reference from the response
    const ref = response.data?.data?.reference;
    console.log('Reference:', ref);

    return ref; // Return the reference for verification later
  } catch (err) {
    console.error('Error initializing payment:', err.message || err);
    throw new ApiError(httpStatus.REQUEST_TIMEOUT, err.message || 'Payment initialization failed');
  }
};

// Function to verify a payment

const VerifyPayment = async (ref) => {
  console.log(ref)
  const MySecretKey = process.env.PAYSTACK_API;
  const url = `https://api.paystack.co/transaction/verify/${encodeURIComponent(ref)}`;

  try {
    console.log('Verifying payment with URL:', url);
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${MySecretKey}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Payment Verified Successfully:', response.data);
    // Return the verification data
    const {amount  } = response.data.data.amount;
    const userId = req.user.id;
    const donationId = req.params.id;
    const date = Date.now();
    const donationCreate =  { amount, donatorId: userId, donationId, date}

    const createNewDonate =  await  UserDonate.create(donationCreate);
    console.log(createNewDonate);
    res.status(200).json("payment successfully verified")
  } catch (err) {
    console.error('Error verifying payment:',  err);
    throw new ApiError(httpStatus.BAD_REQUEST, err);
  }
};

// Function to create a donation request
const requestDonate = async (donateBody) => {
  const { title, description, goalAmount, expiresOn } = donateBody.body;
  const postedBy = donateBody.user?.id;

  try {
    const donationCreated = await Donation.create({ title, description, goalAmount, expiresOn, postedBy });
    console.log('Donation Created:', donationCreated);
    return donationCreated;
  } catch (err) {
    console.error('Error creating donation:', err.message || err);
    throw new ApiError(httpStatus.BAD_REQUEST, err.message || 'Donation creation failed');
  }
};

// Function to get all donations
const getDonations = async () => {
  try {
    const allDonations = await Donation.findAll();
    console.log('All Donations:', allDonations);
    return allDonations;
  } catch (err) {
    console.error('Error fetching donations:', err.message || err);
    throw new ApiError(httpStatus.BAD_REQUEST, err.message || 'Failed to retrieve donations');
  }
};

module.exports = { Donate, requestDonate, VerifyPayment, getDonations };
