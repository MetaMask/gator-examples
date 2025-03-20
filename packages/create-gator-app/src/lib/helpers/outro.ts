import chalk from "chalk";
import { Answers } from "inquirer";

export const displayOutro = (packageManager: string, answers: Answers) => {
  console.log(chalk.cyan("\n🚀 Next steps:"));
  console.log(chalk.white(`  1. cd ${answers.projectName}`));
  console.log(chalk.white(`  2. Update the .env file variables`));
  if (packageManager === "npm") {
    console.log(chalk.white(`  3. ${packageManager} run dev`));
  } else {
    console.log(chalk.white(`  3. ${packageManager} dev`));
  }

  console.log(chalk.cyan("\n📚 Documentation:"));
  console.log(
    chalk.white(
      "  • Learn more about Delegation toolkit: https://docs.gator.metamask.io/"
    )
  );
  console.log(chalk.green("\n🦊 Happy building with Delegation toolkit! 🦊"));
};
