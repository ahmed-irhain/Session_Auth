import express from "express";
import cors from "cors";
import errorHandler from "./middleware/ErrorHandler.js";
import userRouter from "./routes/auth.route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.use("/auth", userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
