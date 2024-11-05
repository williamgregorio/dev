const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const emailProjectPath = path.join(process.cwd(), "emails", "development");

function createProjectName(projectName) {
  const projectDir = path.join(emailProjectPath, projectName);
  const mjmlTemplateFile = path.join(emailProjectPath, "index.mjml");
  const assetsDir = path.join(emailProjectPath, "assets");
  const emailMJMLTemplate = `
  <mjml>
    <mj-head>
      <mj-title>
      
      </mj-title>
    </mj-head>
    <mj-body>

    </mj-body>
  </mjml>`;

  if (!fs.existsSysnc(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
    fs.mkdirSync(assetsDir);
    fs.writeFileSync(mjmlTemplateFile, emailMJMLTemplate);
    console.log(`New project ${projectName}, has been created.`);
  } else {
    console.log(`Project: ${projectName}, already exists.`);
  }
}

