const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
const port = 4009;

require("./db/conn");

const adminAuthRoutes = require("./routes/admin/adminAuthRoutes");
app.use("/adminauth/api", adminAuthRoutes);

app.get("/", (req, res) => {
  res.status(200).json("server started");
});
app.use(cors());
app.listen(port, () => {
  console.log(`server started on port no http://localhost:${port}`);
});
