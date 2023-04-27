import UserModel from "../models/user-model.js";

// async function getLandingPage(req, res) {
//   res.render("landingpage");
// }

// async function getLogin(req, res) {
//   res.render("login");
// }

async function login(req, res) {
  try {
    const { ssn } = req.body;
    const user = await UserModel.findOne({ ssn });

    if (!ssn) {
      throw new Error("Missing ssn in request body");
    }

    if (!user) {
      throw new Error("Invalid ssn or password");
    } else {
      console.log(`Hello ${user.role} ${user.name}`);
      return res.redirect("/menu");
    }

  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: error.message });
  }
}
// async function getRegister(req, res) {
//     res.render("register");
// }

// async function register(req, res) {
//   let queryString = null;

//   try {
//     const { ssn, password } = req.body;
//     const userDocument = new UserModel({ ssn, password });

//     if (ssn.value === "" || password.value === "") {
//       throw new Error("Incorrent info given");
//     }

//     userDocument.save();

//     queryString = new URLSearchParams({
//       message: "Welcome!",
//     }).toString();

//     return res.redirect(`/login?${queryString}`);
//   } catch (error) {
//     console.error(error);
//     queryString = new URLSearchParams({
//       message: error.message,
//     }).toString();
//     res.redirect(`/login/register?${queryString}`);
//   }
// }

export default { /*getLandingPage, getLogin,*/ login/*, register, getRegister*/ };
