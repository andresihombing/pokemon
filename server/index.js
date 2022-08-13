const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const router = require("./src/routes");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.listen(port, () => {
  console.log(`You are connected to ${port}`);
});
