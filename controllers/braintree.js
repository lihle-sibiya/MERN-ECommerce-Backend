const { requireLogin } = require("../middleware/auth");

const User = require("../models/user");
const braintree = require("braintree");

const gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
});

exports.generateBraintreeToken = (req, res) => {
  gateway.clientToken.generate({}, (err, response) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      res.send(response);
    }
  });
};

exports.makePayment = (req, res) => {
  const nonce = req.body.paymentMethodNonce;
  const amount = req.body.amount;

  gateway.transaction.sale(
    {
      amount,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true,
      },
    },
    (err, result) => {
      if (err) {
        return res.status(400).json({ error: err });
      } else {
        res.json(result);
      }
    }
  );
};
