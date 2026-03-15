import express from "express";
import cors from "cors";
import userRouter from "./routes/auth.route.js";
import session from "express-session";

const app = express();
app.use(cors());
app.use(express.json());
app.use(session({
  secret: '4020',
  resave: false,
  saveUninitialized: false, 
}));

app.use("/auth", userRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.send(err.stack).status(err.status || 500)
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${PORT}`);
});
