import express from "express";
import {
  AddQueries,
  DeleteProduct,
  FindProduct,
  GetQueries,
  OtherRecommendations,
  RecommmendationCount,
  UpdateProduct,
  UserProducts,
} from "../controllers/productQueries.controller.js";
export const productQueriesRoute = express.Router();
productQueriesRoute.post("/add_queries", AddQueries);
productQueriesRoute.get("/get_queries", GetQueries);
productQueriesRoute.get("/findProduct/:id", FindProduct);
productQueriesRoute.patch("/update_querie/:id", UpdateProduct);
productQueriesRoute.get("/userProducts/:email", UserProducts);
productQueriesRoute.delete("/deleteProduct/:id", DeleteProduct);
productQueriesRoute.get("/recommendation_count/:id", RecommmendationCount);
productQueriesRoute.get("/other_recommendations/:id", OtherRecommendations);
