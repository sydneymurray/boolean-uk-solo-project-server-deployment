//let { Request, Response } = require("express")
//let {customers} = require("@prisma/client")
let {findUserWithValidation} = require("./service")
let {createToken} = require("../../utils/JWTGenerator")
let {customer} = require("./service")
let dbClient = require("../../utils/prisma")

const loginUser = async (req, res) => {
  const loginDetails = req.body;

  try {
    const loggedUser = await findUserWithValidation(loginDetails);

    const token = createToken({
      id: loggedUser.id,
      username: loggedUser.username,
    });
    res.cookie("token", token, { httpOnly: true });
    res.json({ user: { id: loggedUser.id, username: loggedUser.username } });
  } catch (error) {
    res.status(401).json({ msg: error.message });
  }
};

const createUser = async (req, res) => {
  const newUser = req.body;
  res.json({data: newUser})
  try {
    const savedUser = await customers.create({ data: newUser });

    const token = createToken({
      id: savedUser.customerID,
      username: savedUser.username,
    });
    res.cookie("token", token, { httpOnly: true });
    res.json({ user: { id: savedUser.customerID, username: savedUser.username } });
  } catch (error) {
    res.status(412).json({
      msg: "You probably entered the sign up data in an invalid way ",
    });
  }
};

const logoutUser = (req, res) => {
  res.cookie("token", "", { maxAge: 1 });
  res.redirect("/");
};

module.exports = {loginUser, createUser, logoutUser}