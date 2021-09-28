const {Router} = require("express")
const {createAccount, getAllAccounts, getStatement} = require("./controller")

const accountsRouter = Router()

accountsRouter.get("/", getAllAccounts)
accountsRouter.post("/", createAccount)
accountsRouter.get("/statement", getStatement)

module.exports = accountsRouter

