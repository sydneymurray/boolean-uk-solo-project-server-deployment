let {validateCustomer, customers} = require("./service")
let {createToken} = require("../../utils/JWTGenerator")

const loginUser = async (req, res) => {
  const loginDetails = req.body
  try {
    const loggedInUser = await validateCustomer(loginDetails);
    const token = createToken({
      customerID: loggedInUser.customerID,
      userName: loggedInUser.userName,
    });
    res.cookie("token", token, { httpOnly: true })
    res.json({
      customerID: loggedInUser.customerID, 
      userName: loggedInUser.userName,
      firstName: loggedInUser.firstName,
      lastName: loggedInUser.lastName})
  } catch (error) {
    res.status(401).json({msg: error.message})
  }
}

const createUser = async (req, res) => {
  const newCustomer = req.body
  try {
    const dbResponse = await customers.create(newCustomer)
    const token = createToken({
      customerID: dbResponse.customerID,
      userName: dbResponse.userName,
    })
    res.cookie("token", token, {httpOnly: true})
    res.json({customerID: dbResponse.customerID, userName: dbResponse.userName})
  } catch (error) {
    res.status(412).json({
      msg: "Incorrect Registration Details. Try using a different username."
    })
  }
}

const logoutUser = (req, res) => {
  res.cookie("token", "", {maxAge: 1})
  res.redirect("/");
}

module.exports = {loginUser, createUser, logoutUser}


