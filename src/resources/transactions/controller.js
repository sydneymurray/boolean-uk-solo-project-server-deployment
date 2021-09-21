const prisma = require("../../utils/prisma")
const { response } = require("../Auth/routes")

async function getAllTransactions(req, res) {
  let customerID = req.customer.customerID
  const dbResponse = await prisma.accounts.findMany({
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
    if (dbResponse.customerID!==req.customer.customerID )
      res.status(561).json({msg: "NOT YOUR ACCOUNT!!!"})     
  }

  if (!transaction.payerAccount || !transaction.payeeAccount)
    transaction.comments="CASH: " + transaction.comments
  
  let dbResponse = await prisma.transactions.create({data: transaction})
  res.json(dbResponse)
}

module.exports = {getAllTransactions, createTransaction}

/*
418 I'm a teapot (RFC 2324, RFC 7168) 

let prisma = require("../../utilities/connectDB")

function createOne(req, res){
  let transaction = {...req.body, transactionDate: new Date(req.body.transactionDate)}
  prisma.transactions.create({data: transaction})
    .then(dbResponse => res.json(dbResponse))
  }

function retrieveAll(req, res){
  prisma.transactions.findMany({ 
    orderBy: {transactionDate: "asc"}})
    .then(dbResponse => res.json(dbResponse))
}

function retrieveOne(req, res){
  let id = Number(req.params.id)
  if (id - id !== 0) res.json({msg:"Page Not Found"})
  prisma.transactions.findUnique({
    include:{Cars: true, 
      Owners_OwnersToTransactions_newOwnerId: true,
      Owners_OwnersToTransactions_previousOwnerId: true},
    where: {id}})
    .then(dbResponse => res.json(dbResponse))
}

function deleteOne(req, res){
  let id = Number(req.params.id)
  prisma.transactions.delete({where: {id}})
    .then(dbResponse => res.json(dbResponse))
}

function updateOne(req, res){
  let id = Number(req.params.id)
  let transaction = req.body
  prisma.transactions.update({where: {id}, data: transaction})
    .then(dbResponse => res.json(dbResponse))
}

function showOwner(req, res){
  let id = Number(req.params.id)
  prisma.transactions.findMany({
    include:{Cars: true, 
      Owners_OwnersToTransactions_newOwnerId: true,
      Owners_OwnersToTransactions_previousOwnerId: true}, 
    where: {OR: [{ previousOwnerId: id}, {newOwnerId: id}]},
    orderBy: {transactionDate: "asc"}})
    .then(dbResponse => res.json(dbResponse))
}

function showCar(req, res){
  let id = Number(req.params.id)
  prisma.transactions.findMany({
    include:{Cars: true, 
      Owners_OwnersToTransactions_newOwnerId: true,
      Owners_OwnersToTransactions_previousOwnerId: true}, 
    where: {carId: id},
    orderBy: {transactionDate: "asc"}})
    .then(dbResponse => res.json(dbResponse))
}
module.exports = {createOne, retrieveAll, retrieveOne, deleteOne, updateOne, showOwner, showCar}

*/

