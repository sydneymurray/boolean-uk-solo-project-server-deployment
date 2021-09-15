const prisma = require("../../utils/prisma")
// I'm importing from service my patched version of prisma model
let customerClient = require("./service")

const getAllCustomers = async (req, res) => {
  const allCustomers = await prisma.customers.findMany();

  res.json({ data: allCustomers });
};

const createCustomer = async (req, res) => {
  const newCustomer = req.body;
  // This is my modified create version, with the password hashing!
  const savedCustomer = await customerClient.createWithHash(newCustomer);

  res.json({ data: savedCustomer });
};

module.exports = {getAllCustomers, createCustomer}