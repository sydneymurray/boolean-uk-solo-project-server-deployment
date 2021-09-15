let dbClient = require("../../utils/prisma")
//let {customers} = require( "prisma/prisma-client")
let {compare, hash} = require("bcrypt")

const findUserWithValidation = async (userData) => {
    const userDataFromDB = await dbClient.customers.findUnique({
        where: {email : userData.email}
    })

    if (!userDataFromDB) throw new Error("Username/Password is incorrect")

    const isPasswordValid = await compare(userData.password, userDataFromDB.password)

    if (!isPasswordValid) throw new Error("Username/Password is incorrect")

    return userDataFromDB
}

const create = async ({data: newCustomer}) => {
    const passwordString = newCustomer.password

    const hashedPassword = await hash(passwordString, 10)
    const savedCustomer = await dbClient.customers.create({ data: {...newCustomer, password: hashedPassword}}) 

    res.json({ user: savedCustomer}) 

    return savedCustomer
}

const customer = {...dbClient.customers, create}

module.exports = {findUserWithValidation, customer} 