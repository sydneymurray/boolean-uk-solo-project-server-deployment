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

/*

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

