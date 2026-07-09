import express from "express";
import cors from "cors";
import router from "./modules/user/user.route";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "RentNest Backend Running...",
  });
});

app.use("/api/users", router);

export default app;