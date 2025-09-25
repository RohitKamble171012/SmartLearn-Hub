// server/src/server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js"; // your existing file
import quizRoutes from "./routes/quizRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import aiRoutes from "./routes/aiRoutes.js"; 
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(helmet());
app.use(compression());
/*app.use(cors({
  origin: process.env.CLIENT_URL, 
  credentials: true
}));*/
app.use(cors({origin:true , credentials : true}))

app.use(express.json({limit: "10mb"}));
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);
if (noteRoutes) app.use("/api/notes", noteRoutes); // optional

//openj api
app.use("/api/ai", aiRoutes);


//global error handler
app.use(errorHandler);

/*
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
*/

async function start(){
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }  
} 

start();
