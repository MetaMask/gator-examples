import { TEMPLATES } from "./templates";
import { PackageManager } from "./package-manager";

const packageManagerChoices = (Object.keys(
  { npm: null, yarn: null, pnpm: null } as Record<PackageManager, null>
) as PackageManager[]).map((pm) => ({
  name: pm,
  value: pm,
}));

export const prompts = [
  {
    type: "input",
    name: "projectName",
    message: "What is your project named?",
    default: "my-gator-app",
    validate: (input: string) => {
      if (/^[a-zA-Z0-9-_]+$/.test(input)) return true;
      return "Project name may only include letters, numbers, underscores and hashes.";
    }
  },
  {
    type: "list",
    name: "packageManager",
    message: "Which package manager would you like to use?",
    choices: packageManagerChoices,
  },
  {
    type: "list",
    name: "template",
    message: "Pick a template:",
    choices: TEMPLATES,
  }
];