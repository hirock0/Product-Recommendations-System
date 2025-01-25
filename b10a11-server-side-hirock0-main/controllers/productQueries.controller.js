import dotenv from "dotenv";
dotenv.config();
import { ObjectId } from "mongodb";
import { ConnectionDB } from "../utils/mongoDB.js";
export async function AddQueries(req, res) {
  try {
    const client = await ConnectionDB();
    const reqBody = await req.body;
    const addToDB = await client
      .db("ProductRecommendation")
      .collection("productQueries")
      .insertOne(reqBody);
    if (addToDB?.insertedId !== "") {
      return res
        .status(200)
        .json({ message: "Query added successfully", success: true });
    }
    res.status(200).json({ message: "Query not added", success: false });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
}

export async function GetQueries(req, res) {
  try {
    const client = await ConnectionDB();
    const getQueries = await client
      .db("ProductRecommendation")
      .collection("productQueries")
      .find()
      .sort({ timeStamp: -1 })
      .toArray();

    return res
      .status(200)
      .json({ message: "Query Get successfully", success: true, getQueries });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
}
// user_products_start
export async function UserProducts(req, res) {
  try {
    const { email } = await req.params;
    const userEmail = { email: email };

    const client = await ConnectionDB();
    const userQueries = await client
      .db("ProductRecommendation")
      .collection("productQueries")
      .find(userEmail)
      .sort({ timeStamp: -1 })
      .toArray();
    return res
      .status(200)
      .json({ message: "Query Get successfully", success: true, userQueries });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
}
// user_products_end

export async function FindProduct(req, res) {
  try {
    const { id } = await req.params;
    const productId = { _id: new ObjectId(id) };
    const client = await ConnectionDB();
    const findProduct = await client
      .db("ProductRecommendation")
      .collection("productQueries")
      .findOne(productId);
    return res
      .status(200)
      .json({ message: "Find Product", success: true, findProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
}

export async function UpdateProduct(req, res) {
  try {
    const reqBody = await req.body;
    const productId = await req.params.id;
    const filter = { _id: new ObjectId(productId) };
    const options = { upsert: true };
    const doc = {
      $set: reqBody,
    };
    const client = await ConnectionDB();
    const updateProduct = await client
      .db("ProductRecommendation")
      .collection("productQueries")
      .updateOne(filter, doc, options);

    if (updateProduct.matchedCount === 0) {
      return res
        .status(400)
        .json({ message: "Product not updated", success: false });
    }
    return res
      .status(200)
      .json({ message: "Product Updated Successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
}

export async function DeleteProduct(req, res) {
  try {
    const productId = await req.params.id;
    const client = await ConnectionDB();
    const deleteProduct = await client
      .db("ProductRecommendation")
      .collection("productQueries")
      .deleteOne({ _id: new ObjectId(productId) });
    if (deleteProduct.deletedCount === 0) {
      return res
        .status(400)
        .json({ message: "Product not deleted", success: false });
    }
    return res
      .status(200)
      .json({ message: "Product Deleted Successfully", success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
}

export async function RecommmendationCount(req, res) {
  try {
    const productId = await req.params.id;
    const client = await ConnectionDB();
    const updateProduct = await client
      .db("ProductRecommendation")
      .collection("productQueries")
      .updateOne(
        { _id: new ObjectId(productId) },
        { $inc: { recommendationCount: 1 } }
      );
    if (updateProduct.modifiedCount === 0) {
      return res
        .status(400)
        .json({ message: "Product not updated", success: false });
    } else {
      return res
        .status(200)
        .json({ message: "Product Updated Successfully", success: true });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
}
export async function OtherRecommendations(req, res) {
  try {
    const productEmail = await req.params.id;
    const client = await ConnectionDB();
    const product = await client
      .db("ProductRecommendation")
      .collection("productQueries")
      .find({ email: { $ne: productEmail } })
      .sort({ timeStamp: -1 })
      .toArray();
    if (product.length === 0) {
      return res
        .status(200)
        .json({ message: "No Products Found", success: false });
    } else {
      return res
        .status(200)
        .json({ message: "products Found", success: true, product });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
}
