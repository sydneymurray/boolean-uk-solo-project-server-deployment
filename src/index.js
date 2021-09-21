require("dotenv").config()
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const cookieParser = require("cookie-parser")
const {validateToken} = require("./utils/JWTGenerator")

const authRouter = require("./resources/Auth/routes.js")
const accountsRouter = require("./resources/accounts/routes.js")
const {customersRouter} = require("./resources/customers/routes.js")

const app = express()

/* SETUP MIDDLEWARE */

app.disable("x-powered-by")

//app.use(cors())
app.use(cors({origin: "http://localhost:3000", credentials: true}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan("dev"))
app.use(cookieParser());

// Authorization routes for register, login & logout
app.use(authRouter)

// Protect the routes below for authorized users only
app.use((req, res, next) => {
  const token = req.cookies.token;
  if (!token) res.status(401).json({err: "Not Logged In"})
  const validatedCustomer = validateToken(token)
  if (validatedCustomer) {
    req.customer = validatedCustomer
    next()
  } else res.status(401).json({err: "Not Logged In"})
})

// Unprotected App routes
app.use("/customers", customersRouter)
app.use("/accounts", accountsRouter)

// Unknown routes
app.get("*", (req, res) => {
    res.status(404).json("Route Not Found");
})
  
/* START SERVER */
  
const port = process.env.PORT || 3030
  
app.listen(port, () => {
  console.log(`\n🚀 Server is running on http://localhost:${port}/\n`)
})
  