import express from "express";
import dotenv from "dotenv";
import connectCloudinary from "./config/cloudinary.js";
import connectDb from "./config/mongodb.js";
import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";
import manageError from "./middlewares/manageError.js";

// Config of app
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to the database and Cloudinary
connectDb();
connectCloudinary();

// Middlewares
app.use(express.json());

// API routes
app.use("/api/users", authRoute);
app.use("/api/users", userRoute);
app.get('/',(req,res)=>{
  res.send("welcome to furniche")
})

// Undefined endpoint handling
app.all("*", (req, res) => {
  res.status(404).json({ message: `Cannot access this end point` });
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

// manage error middleware
app.use(manageError);
