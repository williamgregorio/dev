const fs = require("fs");
const path = require("path");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const emailProjectPath = path.join(process.cwd(), "emails", "development");

function createProject(projectName) {
  const projectDir = path.join(emailProjectPath, projectName);
  const mjmlTemplateFile = path.join(emailProjectPath, projectName, "index.mjml");
  const htmlTemplateFile = path.join(emailProjectPath, projectName, "index.html");
  const assetsDir = path.join(emailProjectPath, projectName, "assets");
  const emailMJMLTemplate = `<mjml>
  <mj-head>
    <mj-title>
      
     </mj-title>
   </mj-head>
   <mj-body>

   </mj-body>
</mjml>`;

  if (!fs.existsSync(projectDir)) {
    fs.mkdirSync(projectDir, { recursive: true });
    fs.mkdirSync(assetsDir);
    fs.writeFileSync(mjmlTemplateFile, emailMJMLTemplate);
    fs.writeFileSync(htmlTemplateFile, "MJML data needs to be compiled...");
    console.log(`New project ${projectName}, has been created.`);
  } else {
    console.log(`Project: ${projectName}, already exists.`);
  }
}

function listProjects() {
  const projects = fs.readdirSync(emailProjectPath).filter(file => {
    return fs.statSync(path.join(emailProjectPath, file)).isDirectory()
  });

  console.log("Available projects:");
  projects.forEach((project, index) => {
    console.log(`(${index + 1}). ${project}`);
  });
  return projects;
}

function selectProject(projects) {
  rl.question("Select a project number to set for nodemon.json: ", (number) => {
    const index = parseInt(number) - 1;
    if (index >= 0 && index < projects.length) {
      const selectedProject = projects[index];
      updateNodemonConfig(selectedProject);
    } else {
      console.log("Invalid number or not a number.");
    }
    rl.close();
  });
}

function updateNodemonConfig(projectName) {
  const nodemonConfigFile = path.join(process.cwd(), "nodemon.json");
  const nodemonConfig = {
    watch: [`emails/development/${projectName}`, "local-cms"],
    ext: "mjml",
    exec: `mjml emails/development/${projectName}/index.mjml -o emails/development/${projectName}/index.html`
  };

  fs.writeFileSync(nodemonConfigFile, JSON.stringify(nodemonConfig, null, 2));
  console.log(`nodemon.json updated to watch project: ${projectName}.`);
}

function main() {
  rl.question("Enter a new project name or press [Enter] to list projects: ", (projectName) => {
    if (projectName) {
      createProject(projectName);
      updateNodemonConfig(projectName);
      rl.close();
    } else {
      const projects = listProjects();
      selectProject(projects);
    }
  });
}

main();
