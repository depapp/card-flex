import fs from "fs";
import execa from "execa";

const checkPath = (path) => {
  try {
    return fs.existsSync(path);
  } catch (err) {
    console.error(err);
  }
};

const mapToTemplates = {
  "namecard": "namecard",
};

async function initGit(options) {
  const result = await execa("git", ["init"], {
    cwd: options.targetDirectory,
  });
  if (result.failed) {
    return Promise.reject(new Error("Failed to initialize git"));
  }
  return;
}

async function editPackageJSON(options) {
  const targetDir = options.targetDirectory;
  let jsonFile;

  fs.readFile(`${targetDir}/package.json`, function (err, data) {
    if (!err) {
      jsonFile = JSON.parse(data);
      jsonFile.name = options.name;
      jsonFile.bin[options.name] = "./bin/card.js";

      fs.writeFileSync(
        `${targetDir}/package.json`,
        JSON.stringify(jsonFile, null, "\t"),
        (err, data) => {
          if (err) {
            throw new Error("Unable to update package.json");
          }
        }
      );
    }
  });
}

async function editNamecardData(options) {
  const targetDir = options.targetDirectory;

  const filePath = `${targetDir}/namecardData.js`;
  try {
    let content = fs.readFileSync(filePath, "utf8");

    content = content.replace(
      /githubusername: "(.*)"/,
      `githubusername: "${options.name}"`
    );
    content = content.replace(
      /fullname: "(.*)"/,
      `fullname: "${options.fullname}"`
    );
    content = content.replace(
      /website: "(.*)"/,
      `website: "${options.website}"`
    );
    content = content.replace(
      /work: "(.*)"/,
      `work: "${options.work}"`
    );
    content = content.replace(
      /linkedin: "(.*)"/,
      `linkedin: "${options.linkedin}"`
    );
    content = content.replace(
      /twitter: "(.*)"/,
      `twitter: "${options.twitter}"`
    );

    fs.writeFileSync(filePath, content);
  } catch (err) {
    throw new Error(`Unable to update namecardData.js: ${err}`);
  }
}

export {
  checkPath,
  mapToTemplates,
  initGit,
  editPackageJSON,
  editNamecardData,
};
