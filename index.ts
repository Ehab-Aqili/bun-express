import express from "express";
import cors from "cors";
import connectDB from "./src/models/DBConnection";
import UsersRoute from "./src/routes/auth.route";

const app = express();
const port = 8080;
connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req: any, res: any) => {
  // Bun.env.AUTH_TOKEN access env var
  res.send("Hellow Ehab!");
});

app.use("/api", UsersRoute);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
