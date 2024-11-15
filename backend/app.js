import express from "express";
import contactRoutes from "./src/routes/contactRoutes.js";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";
import cors from "cors";


dotenv.config();
const app = express();

const port = process.env.PORT || 8000;

// connect the backend to the database
connectDB();

app.use(cors({
    origin: '*', // Allows all origins. Adjust this to be more restrictive for security.
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specifies allowed HTTP methods.
    allowedHeaders: ['Content-Type', 'Authorization'] // Specifies allowed headers.
  }));

app.use(express.json());


app.use("/api/v1", contactRoutes);

app.listen(port, () => {
  console.log("Server is running on port", port);
});
