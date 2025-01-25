import dotenv from "dotenv";
dotenv.config();
import { ConnectionDB } from "../utils/mongoDB.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// ---------------------------------------------------------
// token_start

export async function UserToken(req, res) {
  try {
    const token = await req.params.token;
    const decodedToken = await jwt.decode(JSON.parse(token));
    if (token) {
      return res.status(200).json({
        message: "Token Successful",
        success: true,
        decodedToken,
      });
    } else {
      return res.status(200).json({
        message: "Token Unsuccessful",
        success: false,
        decodedToken: null,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}
// ---------------------------------------
// register_start
export async function Register(req, res) {
  try {
    const reqBody = await req.body;
    reqBody.timeStamp = Date.now();
    const client = await ConnectionDB();

    if (reqBody.flag !== "socialAuth") {
      const hashedPassword = await bcrypt.hash(reqBody.password, 10);
      reqBody.password = hashedPassword;
    }
    const findUser = await client
      .db("User")
      .collection("users")
      .findOne({ email: reqBody.email });

    const tokenData = {
      email: reqBody.email,
      image: reqBody.image,
      name: reqBody.name,
    };

    if (reqBody.flag === "socialAuth" && !findUser) {
      // ---------------------------------------------
      const User = await client
        .db("User")
        .collection("users")
        .insertOne(reqBody);
      if (User.insertedId !== "") {
        tokenData._id == User?.insertedId;

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
          expiresIn: "1d",
        });
        return res.status(200).json({
          message: "User registered successfully",
          success: true,
          token,
        });
      }
      // ---------------------------------
    } else if (reqBody.flag === "socialAuth" && findUser) {
      tokenData._id = findUser._id;
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
      });

      return res.status(200).json({
        message: "User registered successfully",
        success: true,
        token,
      });
    } else if (!findUser) {
      const User = await client
        .db("User")
        .collection("users")
        .insertOne(reqBody);

      if (User.insertedId !== "") {
        tokenData._id = User?.insertedId;
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
          expiresIn: "1d",
        });
        return res.status(200).json({
          message: "User registered successfully",
          success: true,
          token,
        });
      }
    } else {
      return res.status(200).json({
        message: "This email already used",
        success: false,
      });
    }
    // ------
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}

// export async function Login(req, res) {
//   try {
//     const client = await ConnectionDB();
//     const reqBody = await req.body;
//     const { email, password } = reqBody;
//     const findUser = await client
//       .db("User")
//       .collection("users")
//       .findOne({ email: email });

//     if (findUser === null) {
//       return res.status(200).json({
//         message: "Email does't exist!",
//         success: false,
//       });
//     } else {
//       const matchPassword = await bcrypt.compare(password, findUser?.password);
//       if (!matchPassword) {
//         return res.status(200).json({
//           message: "Password does't match!",
//           success: false,
//         });
//       } else {
//         const tokenData = {
//           _id: findUser?._id,
//           email: findUser?.email,
//           name: findUser?.name,
//           image: findUser?.image,
//         };
//         const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
//           expiresIn: "1d",
//         });
//         return res
//           .cookie("token", token, {
//             httpOnly: true,
//             secure: true,
//             sameSite: "None",
//           })
//           .status(200)
//           .json({
//             message: "User Login successfully",
//             success: true,
//           });
//       }
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: error.message,
//       success: false,
//     });
//   }
// }
export async function Login(req, res) {
  try {
    const { email, password } = await req.body;
    const client = await ConnectionDB();
    const findUser = await client
      .db("User")
      .collection("users")
      .findOne({ email: email });
    if (findUser === null) {
      return res.status(200).json({
        message: "Email not matched",
        success: false,
      });
    } else {
      const matchPassword = await bcrypt.compare(password, findUser?.password);
      if (matchPassword) {
        const tokenData = {
          email: findUser?.email,
          image: findUser?.image,
          id: findUser?._id,
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
          expiresIn: "1d",
        });
        return res.status(200).json({
          message: "User Login successfully",
          success: true,
          token,
        });
      } else {
        return res.status(200).json({
          message: "Password not matched",
          success: false,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}

export async function Logout(req, res) {
  try {
    return res.status(401).json({
      message: "User Logout successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
}
