const {Router} = require("express")
const {getCustomer, patchCustomer, getAllCustomers} = require("./controller")

const customersRouter = Router()

//customersRouter.get("/", getAllCustomers)
customersRouter.patch("/", patchCustomer)
customersRouter.get("/", getCustomer)

module.exports = {customersRouter}
