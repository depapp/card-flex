import askQuestions from "./questions";
import createProject from "./main";

export async function cli() {
  const options = await askQuestions();

  await createProject(options);
}
