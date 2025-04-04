import { Answers } from "inquirer";
import { FRAMEWORK_OPTIONS } from "../choices/framework";
import { PACKAGE_MANAGER_OPTIONS } from "../choices/package-manager";
import {
  NEXTJS_TEMPLATE_OPTIONS,
  VITE_REACT_TEMPLATE_OPTIONS,
} from "../choices/templates";
import { validateProjectName } from "../helpers/validators";

export const BASE_PROMPTS = [
  {
    type: "input",
    name: "projectName",
    message: "What is your project named?",
    default: "my-gator-app",
    validate: (input: string) => {
      if (validateProjectName(input)) return true;
      return "Project name may only include letters, numbers, underscores and hashes.";
    },
  },
  {
    type: "list",
    name: "packageManager",
    message: "Which package manager would you like to use?",
    choices: PACKAGE_MANAGER_OPTIONS,
  },
  {
    type: "list",
    name: "framework",
    message: "Please choose a framework:",
    choices: FRAMEWORK_OPTIONS,
  },
  {
    type: "list",
    name: "template",
    message: "Pick a template:",
    choices: NEXTJS_TEMPLATE_OPTIONS,
    when: (answers: Answers) => {
      return answers.framework === "nextjs";
    },
  },
  {
    type: "list",
    name: "template",
    message: "Pick a template:",
    choices: VITE_REACT_TEMPLATE_OPTIONS,
    when: (answers: Answers) => {
      return answers.framework === "vite-react";
    },
  },
];
