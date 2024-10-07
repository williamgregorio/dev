const express = require("express");
const path = require("path");
const cors = require('cors');
const fs = require("node:fs");
const cms = express();

const port = 3001;
const dataDir = path.join(__dirname, '..', 'data');
const emailsJSON = path.join(dataDir, 'emails.json');
const emailTypesJSON = path.join(dataDir, 'email-types.json');
const skillsJSON = path.join(dataDir, 'skills.json');

cms.use(cors());
cms.use(express.json());
cms.use(express.static(path.join(__dirname, 'public')));

function readJSONData(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
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
