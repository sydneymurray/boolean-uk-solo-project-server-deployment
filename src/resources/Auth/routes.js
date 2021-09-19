let Router = require("express")
let {loginUser, createUser, logoutUser} = require("./controller")

let authRouter = Router();

authRouter.route("/login").post(loginUser);
authRouter.route("/register").post(createUser);
authRouter.route("/logout").get(logoutUser);

module.exports = authRouter;
