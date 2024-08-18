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


const TOKEN_SECRET_KEY = "QWESDSDFFGGHTT^GYUAYUHHJDIJOSHUSDY&SUGSBJSSKLNDNBBSKHUHJUSIJLSIJIJIUBHJSDDS";
const jwt = require("jsonwebtoken");
require('dotenv').config();
async function authToken(req, res, next) {
  try {
    const token = req.cookies?.token;

    console.log("token", token);
    if (!token) {
      return res.status(401).json({
        message: "Please Login...!",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, TOKEN_SECRET_KEY, function (err, decoded) {
      console.log(err);
      console.log("decoded", decoded);

      if (err) {
        console.log("error auth", err);
        return res.status(401).json({
          message: "Unauthorized",
          error: true,
          success: false,
        });
      }

      req.userId = decoded?._id;
      next();
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
