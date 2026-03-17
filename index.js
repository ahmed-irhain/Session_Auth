import express from "express";
import cors from "cors";
import userRouter from "./routes/auth.route.js";
import profileRouter from "./routes/profile.route.js"

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", userRouter);
app.use("/profile", profileRouter);

app.use((err, req, res, next) => {
    console.error(`${err.status} - ${err.stack}`);
    res.status(err.status || 500).send(err.stack)
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running...`);
});
