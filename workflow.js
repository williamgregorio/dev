const fs = require("node:fs");
const path = require("path");
const readline = require("node:readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const root = process.cwd();
const rootAssetsDirectory = path.join(root, "emails", "assets");

function getProjectNamePrompt() {
rl.question(`Provide project name directory: `, projectName => {
  validateHTMLExists(projectName);
});
}

function nameYourProductionProjectFile(projectName, htmlContent) {
  const askUserForHTMLFileName = () => {
    rl.question(`Name your project file (no extension required): `, htmlFileName => {
      const productionFileName = `${htmlFileName}.html`;
      const productionFilePath = path.join(root, "emails", productionFileName);
      fs.access(productionFilePath, fs.constants.F_OK, (err) => {
        if (err) {
          fs.writeFile(productionFilePath, htmlContent, (err) => {
            if (err) {
              console.error("Error W on HTML file: ", err);
            } else {
              console.log(`Successfully created ${productionFileName}`);
            }
            rl.close();
          });
        } else {
          console.log(`File ${productionFileName} already exists, please choose a different name.`);
          askUserForHTMLFileName();
        }
      });
    });
  }

  askUserForHTMLFileName();
}

function validateHTMLExists(projectName) {
  const htmlFilePath = path.join(root, 'emails', 'development', projectName, 'index.html');

  fs.access(htmlFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("HTML file does not exist in directory: ", err);
      rl.close();
      return;
    }

    getHTMLFile(htmlFilePath, projectName);
  });
}

function getHTMLFile(htmlFilePath, projectName) {
  fs.readFile(htmlFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading this HTML file: ", err);
      rl.close();
      return;
    }

    console.log("HTML :\n", data);
    copyImageToAssets(projectName, data);
  });
}

function copyImageToAssets(projectName, htmlContent) {
  const imagesDirectory = path.join(root,'emails', 'development', projectName, 'assets');

  fs.readdir(imagesDirectory, (err, files) => {
    if (err) {
      console.error("Error reading images in this directory: ", err);
      return;
    }

    let copyCount = 0;
    files.forEach(file => {
      const srcFilePath = path.join(imagesDirectory, file);
      const destFilePath = path.join(rootAssetsDirectory, file);
      
      fs.access(destFilePath, fs.constants.F_OK, (err) => {
        if (err) {
          fs.copyFile(srcFilePath, destFilePath, (err) => {
            if (err) {
              console.error("Error moving to destination: ", err);
            } else {
              console.log(`Copied ${file} into production assets directory.`);
              copyCount++;

              if (copyCount === files.length) {
                nameYourProductionProjectFile(projectName, htmlContent);
              }
            }
          })
        } else {
          console.log(`This ${file} already exists in production assets directory.`);
          copyCount++;

          if (copyCount === files.length) {
            nameYourProductionProjectFile(projectName, htmlContent);
          }
        }
      });
    });
  });
}

function main() {
  getProjectNamePrompt();
}

main();
