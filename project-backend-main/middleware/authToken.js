// const TOKEN_SECRET_KEY="QWESDSDFFGGHTT^GYUAYUHHJDIJOSHUSDY&SUGSBJSSKLNDNBBSKHUHJUSIJLSIJIJIUBHJSDDS"

// const jwt = require("jsonwebtoken");

// async function authToken(req, res, next) {
//   try {
//     const token = req.cookies?.token;

//     console.log("token", token);
//     if (!token) {
//       return res.status(200).json({
//         message: "Please Login...!",
//         error: true,
//         success: false,
//       });
//     }

//     jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
//       console.log(err);
//       console.log("decoded", decoded);

//       if (err) {
//         console.log("error auth", err);
//       }

//       req.userId = decoded?._id;

//       next();
//     });
//   } catch (err) {
//     res.status(400).json({
//       message: err.message || err,
//       data: [],
//       error: true,
//       success: false,
//     });
//   }
// }

// module.exports = authToken;


const jwt = require("jsonwebtoken");
require('dotenv').config();

// Use the environment variable for the secret key if defined
const TOKEN_SECRET_KEY = process.env.TOKEN_SECRET_KEY || "QWESDSDFFGGHTT^GYUAYUHHJDIJOSHUSDY&SUGSBJSSKLNDNBBSKHUHJUSIJLSIJIJIUBHJSDDS";

async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    console.log("Token from cookies:", token);

    if (!token) {
      return res.status(401).json({
        message: "Please Login...!",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, TOKEN_SECRET_KEY, function (err, decoded) {
      if (err) {
        console.error("Error during token verification:", err);
        return res.status(401).json({
          message: "Unauthorized",
          error: true,
          success: false,
        });
      }

      console.log("Decoded token:", decoded);
      req.userId = decoded?._id;
      next();
    });
  } catch (err) {
    console.error("Error in authToken middleware:", err);
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;

