require("dotenv").config();
import { Asana } from "../../services";
import { default as express } from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post("/", async (req, res) => {
  console.log(`request body -> ${JSON.stringify(req.body, null, 2)}`);
  if (req.body && req.body.events && req.body.events.length) {
    await Asana.handleHook(req.body);
  }
  const secret = req.headers["x-hook-secret"];
  if (secret) {
    res.setHeader("X-Hook-Secret", secret);
  }
  res.json({ message: "Ok" });
});

app.listen(port, () => {
  console.log(`asana-task-id app listening at http://localhost:${port}`);
});
