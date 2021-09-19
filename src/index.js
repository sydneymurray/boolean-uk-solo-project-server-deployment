require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const cookieParser = require("cookie-parser");

const authRouter = require("./resources/Auth/routes.js")
const {customersRouter} = require("./resources/customers/routes.js")

const app = express()

/* SETUP MIDDLEWARE */

app.disable("x-powered-by")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))
app.use(cookieParser());

// Authorization routes for register, login & logout
app.use(authRouter)

// Protect the routes below for authorized users only

// Unprotected App routes
app.use("/customers", customersRouter)

// Unknown routes
app.get("*", (req, res) => {
    res.status(404).json("Route Not Found");
})
  
/* START SERVER */
  
const port = process.env.PORT || 3030
  
app.listen(port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${port}/\n`)
})
  