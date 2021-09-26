const prisma = require("../../utils/prisma")

const getAllCustomers = async (req, res) => {
  const allCustomers = await prisma.customers.findMany()

  res.json({ data: allCustomers });
}

const patchCustomer = async (req, res) => {
  let customer = req.body
  customer.customerID = Number(req.customer.customerID)
  const customerID =  customer.customerID

  let dbResponse = await prisma.customers.update({where: {customerID}, data: customer})
  dbResponse.password = null
  res.json(dbResponse)
}

module.exports = {getAllCustomers, patchCustomer}