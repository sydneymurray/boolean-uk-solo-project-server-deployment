const {Router} = require("express")
const {createTransaction, getAllTransactions} = require("./controller")

const transactionsRouter = Router()

//transactionsRouter.get("/", getAllTransactions)
transactionsRouter.post("/", createTransaction)


module.exports = transactionsRouter

