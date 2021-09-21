const {Router} = require("express")
const {createAccount, getAllAccounts} = require("./controller")

const accountsRouter = Router()

accountsRouter.get("/", getAllAccounts)
accountsRouter.post("/", createAccount)

module.exports = accountsRouter

/*

const express = require("express")  
const carsRouter = express.Router()

const carsController = require("./controllers")

carsRouter.post("/", carsController.createOne)
carsRouter.get("/", carsController.retrieveAll)
carsRouter.get("/search", carsController.searchAll)
carsRouter.get("/:id", carsController.retrieveOne)
carsRouter.delete("/:id", carsController.deleteOne)
carsRouter.patch("/:id", carsController.updateOne)

module.exports = carsRouter


*/