// app.js

import express from "express";
import cors from "cors";
import connectToDatabase from "./database/dbConnect.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import authRouter from "./routes/authRouter.js";
import productRouter from "./routes/productsRouter.js";
import cartRouter from "./routes/cartRouter.js";
import routes from "./routes/routes.js";
import path from "path";
// import bodyParser from "body-parser";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
//app.use(bodyParser.json());

app.use("/", routes);
app.use("/user", userRouter);
app.use("/auth", authRouter);
app.use("/product", productRouter);
app.use("/carts", cartRouter);


// Middleware for serving static files
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
    
  // Fallback route to return to index
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

// Connect to the database
const connection = await connectToDatabase();

// Start server
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});

// Handling database connection errors
connection.on("error", (error) => {
  console.error("Database connection error:", error);
});

// Handling successful database connection
connection.once("open", () => {
  console.log("Database connection successful");
});

export default app;
