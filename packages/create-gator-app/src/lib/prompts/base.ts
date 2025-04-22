import { Answers } from "inquirer";
import { FRAMEWORK_OPTIONS } from "../choices/framework";
import { PACKAGE_MANAGER_OPTIONS } from "../choices/package-manager";
import { TEMPLATE_OPTIONS } from "../choices/templates";
import { validateProjectName } from "../helpers/validators";

export const BASE_PROMPTS = [
  {
    type: "input",
    name: "projectName",
    message: "What is your project named?",
    default: "my-gator-app",
    validate: validateProjectName,
  },
  {
    type: "list",
    name: "framework",
    message: "Pick a framework:",
    choices: FRAMEWORK_OPTIONS,
  },
  {
    type: "list",
    name: "template",
    message: "Pick a template:",
    choices: (answers: Answers) => {
        return TEMPLATE_OPTIONS.filter(t => t.framework === answers.framework);
    },
  },
  {
    type: "list",
    name: "packageManager",
    message: "Pick a package manager:",
    choices: PACKAGE_MANAGER_OPTIONS,
    default: "npm",
  },
];
