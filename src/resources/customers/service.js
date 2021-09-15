const prisma = require("../../utils/prisma")
const {hash} = require("bcrypt")

const createWithHash = async (newCustomer) => {
  // grab user plaintext password
  const plaintext = newCustomer.password;

  // Hash it using bcrypt. It will return a PROMISE!!!!
  const hashedPassword = await hash(plaintext, 10);

  // Make sure to save the hashed password!
  const savedCustomer = await prisma.customers.create({
    data: { ...newCustomer, password: hashedPassword },
  });

  return savedCustomer;
};

const customerClient = {...prisma.customer, createWithHash}

module.exports = {createWithHash, customerClient}