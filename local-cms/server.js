const express = require("express");
const path = require("path");
const cors = require('cors');
const fs = require("node:fs");
const cms = express();

const port = 3001;
const dataDir = path.join(__dirname, '..', 'data');
const emailsJSON = path.join(dataDir, 'emails.json');

cms.user(cors());
cms.use(express.json());
cms.use(express.static(path.join(__dirname, 'public')));

function readJSONData(file) {
  const data = fs.readFileSync(file);
  return JSON.parse(data);
}

function writeJSONData(data) {
  fs.writeFileSync(data, JSON.stringify(data, null, 2));
}

cms.get("/api/emails", (req,res) => {
  const emails = readJSONData(emailsJSON);
  res.json(emails);
});

cms.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})
