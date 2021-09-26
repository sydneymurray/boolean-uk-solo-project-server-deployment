const {Router} = require("express")
const {patchCustomer, getAllCustomers} = require("./controller")

const customersRouter = Router()

//customersRouter.get("/", getAllCustomers)
customersRouter.patch("/", patchCustomer)

module.exports = {customersRouter}
