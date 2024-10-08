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
const sectionsJSON = path.join(dataDir, 'sections.json');

cms.use(cors());
cms.use(express.json());
cms.use(express.static(path.join(__dirname, 'public')));

function readJSONData(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function writeJSONData(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

cms.get("/api/email-types", (req,res) => {
  const emailTypes = readJSONData(emailTypesJSON);
  res.json(emailTypes);
});

cms.get("/api/emails", (req,res) => {
  const emails = readJSONData(emailsJSON);
  res.json(emails);
});

cms.get("/api/sections", (req,res) => {
  const sections = readJSONData(sectionsJSON);
  res.json(sections);
});

cms.post("/api/emails", (req,res) => {
  const emails = readJSONData(emailsJSON);
  emails.push(req.body);
  writeJSONData(emailsJSON, emails);
  res.status(201).json(req.body);
});

cms.put("/api/emails/:index", (req,res) => {
  const index = req.params.index;
  const emails = readJSONData(emailsJSON);

  if (emails.length >= 0 && index < emails.length) {
    emails[index] = req.body;
    writeJSONData(emailsJSON, emails);
    res.json(emails[index]);
  } else {
    res.status(404).json({error: 'Email not found on file.'});
  }
});

cms.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})
