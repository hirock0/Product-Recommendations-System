import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userRoutes } from "./routes/user.route.js";
import { productQueriesRoute } from "./routes/productQueries.route.js";
const app = express();
const corsOptions = {
  origin: process.env.CLIENT_SIDE_URL,
  credentials: true,
};
app.use(cookieParser(process.env.TOKEN_SECRET));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use("/api/user", userRoutes);
app.use("/api/productQueries", productQueriesRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
