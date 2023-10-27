import chalk from "chalk";
import fs from "fs";
import ncp from "ncp";
import path from "path";
import { promisify } from "util";
import Listr from "listr";
import { projectInstall } from "pkg-install";
import {
  initGit,
  mapToTemplates,
  editPackageJSON,
  editNamecardData,
} from "./utils";
import figlet from "figlet";
import clear from "clear";

const access = promisify(fs.access);
const copy = promisify(ncp);

async function copyTemplateFiles(options) {
  return copy(options.templateDirectory, options.targetDirectory, {
    clobber: false,
  });
}

async function createProject(options) {
  const config = {
    name: options["project-name"],
    handle: options["project-handle"],
    fullname: options["fullname"],
    website: options["website"],
    work: options["work"],
    linkedin: options["linkedin"],
    twitter: options["twitter"],
    template: "namecard",
    manager: "npm",
    git: true,
    pkg: true,
    install: true,
  };

  let templateDirectory;

  if (options["template-path"]) {
    templateDirectory = options["template-path"];
  } else {
    templateDirectory = path.resolve(
      __dirname,
      "../templates",
      mapToTemplates[config.template]
    );
  }

  const CURR_DIR = process.cwd();

  config.templateDirectory = templateDirectory;
  config.targetDirectory = `${CURR_DIR}/${config.name}`;

  try {
    await access(templateDirectory, fs.constants.R_OK);
  } catch (error) {
    console.error(`${chalk.red.bold("ERROR")}  Invalid template name`);
    process.exit(1);
  }

  const tasks = new Listr([
    {
      title: "preparing things. let's count...",
      task: () => copyTemplateFiles(config),
    },
    {
      title: "one.",
      task: () => initGit(config),
      enabled: () => config.git,
    },
    {
      title: "two..",
      task: () => editPackageJSON(config),
      enabled: () => config.template !== "basic",
    },
    {
      title: "three...",
      task: () => editNamecardData(config),
      enabled: () => config.template !== "basic",
    },
    {
      title: "getting things ready...",
      task: () => {
        return projectInstall({
          cwd: config.targetDirectory,
          prefer: config.manager,
        });
      },
      skip: () => {
        if (!config.install) {
          return "No dependencies will be installed";
        }
      },
    },
  ]);
  console.log("");
  await tasks.run();
  clear();
  figlet(`card-flex`, (err, data) => {
    console.log(data);
    console.log(
      chalk.white(` is ready to use. run the following commands.`) +
        "\n" +
        "\n" +
        chalk.yellow.bold(` cd ${config.name}`) +
        "\n" +
        chalk.yellow.bold(` npm run dev`)
    );
  });

  return true;
}

export default createProject;
