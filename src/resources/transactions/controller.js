const prisma = require("../../utils/prisma")

async function getAllTransactions(req, res) {
  let checkAccount = Number(req.params.id)
  let dbResponse = await prisma.accounts.findUnique({
    where: {accountID: checkAccount}})
  
  if (!dbResponse.customerID)
    res.status(561).json({msg: "Account does not Exist."})       

  if (dbResponse.customerID!==req.customer.customerID)
    res.status(561).json({msg: "NOT YOUR ACCOUNT!!!"})  

  let customerID = req.customer.customerID
  dbResponse = await prisma.accounts.findMany({
    where: {customerID: customerID}
  })
  res.json(dbResponse)
}

async function createTransaction(req, res) {
  let transaction = req.body
  
  if (!transaction.payerAccount && !transaction.payeeAccount)
    res.status(418).json({msg: "Account Details Missing"})
  
  if (transaction.payerAccount){
    let checkAccount = transaction.payerAccount  
    let dbResponse = await prisma.accounts.findUnique({
      where: {accountID: checkAccount}
    })
    if (dbResponse.customerID!==req.customer.customerID)
      res.status(561).json({msg: "NOT YOUR ACCOUNT!!!"})     
  }

  if (transaction.payeeAccount){
    let checkAccount = transaction.payeeAccount  
    dbResponse = await prisma.accounts.findUnique({
      where: {accountID: checkAccount}})    
    if (!dbResponse)
      res.status(404).json({msg: "Account does not exist"})
  }      

  if (transaction.payerAccount){
    let checkAccount = transaction.payerAccount  
    let dbResponse = await prisma.transactions.findMany({
      where: {OR: [{payeeAccount: checkAccount}, {payerAccount: checkAccount}]}
    })
    let balance = 0
    dbResponse.map(transaction=>{
      if (checkAccount===transaction.payeeAccount) balance+=transaction.amount 
      else balance-=transaction.amount 
    })
    if (balance-transaction.amount<1){ 
      res.status(901).json({msg: "Insufficent Funds"})
      return
    }     
  }    

  dbResponse = await prisma.transactions.create({data: transaction})
  res.json(dbResponse)
}

module.exports = {getAllTransactions, createTransaction}

