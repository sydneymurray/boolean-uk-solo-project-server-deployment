const {Router} = require("express")
const {createCustomer, getAllCustomers} = require("./controller")

const customersRouter = Router()

customersRouter.get("/", getAllCustomers)
customersRouter.post("/", createCustomer)

module.exports = {customersRouter}
