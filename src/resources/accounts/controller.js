const prisma = require("../../utils/prisma")

async function getAllAccounts(req, res) {
  let customerID = req.customer.customerID
  const dbResponse = await prisma.accounts.findMany({
    where: {customerID: customerID}
  })
  res.json(dbResponse)
}

async function createAccount(req, res) {
  let newAccount = req.body
  newAccount = {...newAccount, customerID: req.customer.customerID}
  let dbResponse = await prisma.accounts.create({data: newAccount})
  res.json(dbResponse)
}

module.exports = {getAllAccounts, createAccount}



