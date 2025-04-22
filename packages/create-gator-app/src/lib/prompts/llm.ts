import { Answers } from "inquirer";

export const LLM_PROMPTS = [
  {
    type: "list",
    name: "ideType",
    message: "Which IDE's LLM rules would you like to copy?",
    choices: ["Cursor", "Windsurf", "Both"],
    default: "Both",
  },
];
