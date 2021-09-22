const prisma = require("../../utils/prisma")
const { response } = require("../Auth/routes")

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

async function getStatement(req, res){
  let accountID = req.body.accountID
  let dbResponse = await prisma.accounts.findUnique({
    where: {accountID: accountID}
  })
  if (dbResponse.customerID!==req.customer.customerID)
    res.status(561).json({msg: "NOT YOUR ACCOUNT!!!"})
  
    dbResponse = await prisma.transactions.findMany({
      where: {OR: [{payeeAccount: accountID}, {payerAccount: accountID}]},
      orderBy: {date: "desc"}      
    })
  res.json(dbResponse)
}

module.exports = {getAllAccounts, createAccount, getStatement}


