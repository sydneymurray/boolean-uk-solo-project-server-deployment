const {Router} = require("express")
const {createAccount, getAllAccounts} = require("./controller")

const accountsRouter = Router()

accountsRouter.get("/", getAllAccounts)
accountsRouter.post("/", createAccount)

module.exports = accountsRouter

