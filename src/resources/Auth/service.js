let prisma = require("../../utils/prisma")
let {compare, hash} = require("bcrypt")

const validateCustomer = async (loginDetails) => {
  const dbResponse = await prisma.customers.findUnique({
    where: {userName : loginDetails.userName}
  })
  if (!dbResponse) throw new Error("Incorrect Login Details")
  const validPassword = await compare(loginDetails.password, dbResponse.password)
  if (!validPassword) throw new Error("Incorrect Login Details")
  return dbResponse
}

const create = async (newCustomer) => {
  const passwordString = newCustomer.password
  const hashedPassword = await hash(passwordString, 10)
  const dbResponse = await prisma.customers.create({data: {...newCustomer, password: hashedPassword}}) 
  return dbResponse
}

const customers = {...prisma.customers, create}

module.exports = {validateCustomer, customers} 