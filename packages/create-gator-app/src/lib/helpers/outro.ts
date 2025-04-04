import chalk from "chalk";
import GatorAppConfiguration from "../types/gator-app-configuration";

export const displayOutro = (gatorAppConfiguration: GatorAppConfiguration) => {
  console.log(chalk.cyan("\n🚀 Next steps:"));
  console.log(chalk.white(`  1. cd ${gatorAppConfiguration.projectName}`));
  console.log(chalk.white(`  2. Update the .env file variables`));
  if (gatorAppConfiguration.packageManager === "npm") {
    console.log(
      chalk.white(`  3. ${gatorAppConfiguration.packageManager} run dev`)
    );
  } else {
    console.log(
      chalk.white(`  3. ${gatorAppConfiguration.packageManager} dev`)
    );
  }

  console.log(chalk.cyan("\n📚 Documentation:"));
  console.log(
    chalk.white(
      "  • Learn more about Delegation toolkit: https://docs.gator.metamask.io/"
    )
  );
  console.log(chalk.green("\n🦊 Happy building with Delegation toolkit! 🦊"));
};
