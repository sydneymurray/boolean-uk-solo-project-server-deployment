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
  newAccount = {...newAccount, 
    customerID: Number(req.customer.customerID),
    active: true,
    overdraftLimit: Number(0)
  }
  let dbResponse = await prisma.accounts.create({data: newAccount})
  //let zeroDeposit = await prisma.transactions.create({
  //  amount: 0,
  //  payeeAccount: dbResponse.accountID,
  //  comments: "New Account"	  
  //})
  res.json(dbResponse)
}

async function getStatement(req, res){
  //let accountID = Number(req.params.id)
  let accountID = Number(req.headers.accountid)
  console.error(accountID)

  let dbResponse = await prisma.accounts.findUnique({
    where: {accountID: accountID}})

  if (!dbResponse)
  res.status(561).json({msg: "Account does not exist"})

  if (dbResponse.customerID!==req.customer.customerID)
    res.status(561).json({msg: "NOT YOUR ACCOUNT!!!"})
  
  dbResponse = await prisma.transactions.findMany({
    include: {
      accounts_accountsTotransactions_payeeAccount:{ 
        include: {customers: {select: {
          firstName: true, lastName: true, email: true}}}},
      accounts_accountsTotransactions_payerAccount:{ 
        include: {customers: {select: {
          firstName: true, lastName: true, email: true}}}}},
    where: {OR: [{payeeAccount: accountID}, {payerAccount: accountID}]},
    orderBy: {date: "desc"}})
  res.json(dbResponse)
}

module.exports = {getAllAccounts, createAccount, getStatement}



