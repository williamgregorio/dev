const express = require("express");
const app = express();

const port = 3000;

app.use(express.json());
app.use(express.static("../"));


app.get("/", (req,res) => {
  res.send("Local CMS");
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})
