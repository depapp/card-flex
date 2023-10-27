import chalk from "chalk";
import inquirer from "inquirer";
import { checkPath } from "./utils";

async function askQuestions() {
  console.log(
    chalk.yellow.bold(
      " welcome to card-flex.\n to get started, please answer the following questions.\n you don't need to use @ on the username."
    )
  );

  const questionsSetProject = [
    {
      name: "project-name",
      type: "input",
      message: "Input your GitHub username: ",
      validate: function (input) {
        let valid = true;

        if (/^[a-z](?:_?[a-z0-9\-\_\d]+)*$/i.test(input)) {
          valid = valid && true;
        } else {
          return "Project must \n 1) start with a letter \n 2) name may only include letters, numbers, underscores and hashes.";
        }

        const path = `${process.cwd()}/${input}`;

        if (checkPath(path)) {
          return "Project with this name already exists at this location";
        } else {
          return valid && true;
        }
      },
    },
  ];

  const questionsSetFullname = [
    {
      name: "fullname",
      type: "input",
      message: "Input your Full Name: ",
    },
  ];

  const questionsSetWebsite = [
    {
      name: "website",
      type: "input",
      message: `Input your website: `,
    },
  ];

  const questionsSetWork = [
    {
      name: "work",
      type: "input",
      message: "Input your title at work: ",
    },
  ];

  const questionsSetLinkedin = [
    {
      name: "linkedin",
      type: "input",
      message: "Input your LinkedIn username: ",
    },
  ];

  const questionsSetTwitter = [
    {
      name: "twitter",
      type: "input",
      message: "Input your Twitter username: ",
    },
  ];

  try {
    let answerProject, answerFullname, answerWebsite, answerWork, answerLinkedin, answerTwitter;

    answerProject = await inquirer.prompt(questionsSetProject);
    answerFullname = await inquirer.prompt(questionsSetFullname);
    answerWebsite = await inquirer.prompt(questionsSetWebsite);
    answerWork = await inquirer.prompt(questionsSetWork);
    answerLinkedin = await inquirer.prompt(questionsSetLinkedin);
    answerTwitter = await inquirer.prompt(questionsSetTwitter);

    const answers = {
      ...answerProject,
      ...answerFullname,
      ...answerWebsite,
      ...answerWork,
      ...answerLinkedin,
      ...answerTwitter,
    };

    return answers;
  } catch (err) {
    if (err) {
      switch (err.status) {
        case 401:
          console.error("401");
          break;
        default:
          console.error(err);
      }
    }
  }
}

export default askQuestions;
