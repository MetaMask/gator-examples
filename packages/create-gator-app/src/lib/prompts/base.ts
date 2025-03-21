import { FRAMEWORKS_OPTIONS } from "../choices/framework";
import { PACKAGE_MANAGER_OPTIONS } from "../choices/package-manager";
import { TEMPLATE_OPTIONS } from "../choices/templates";
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
    name: "framework",
    message: "Please choose a framework:",
    choices: FRAMEWORKS_OPTIONS,
  },
  {
    type: "list",
    name: "packageManager",
    message: "Which package manager would you like to use?",
    choices: PACKAGE_MANAGER_OPTIONS,
  },
  {
    type: "list",
    name: "template",
    message: "Pick a template:",
    choices: TEMPLATE_OPTIONS,
  },
  {
    type: "confirm",
    name: "useEmbeddedWallet",
    message: "Do you want to use an embedded wallet?",
    default: true,
  },
];
