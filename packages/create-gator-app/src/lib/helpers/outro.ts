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
  
  if (gatorAppConfiguration.llmRules && gatorAppConfiguration.ideType) {
    console.log(chalk.cyan("\n🤖 LLM Context:"));
    let ideMessage = "";
    
    if (gatorAppConfiguration.ideType === "Cursor") {
      ideMessage = "Cursor";
    } else if (gatorAppConfiguration.ideType === "Windsurf") {
      ideMessage = "Windsurf";
    } else if (gatorAppConfiguration.ideType === "Both") {
      ideMessage = "Cursor and Windsurf";
    }
    
    console.log(
      chalk.white(
        `  • LLM rules files for ${ideMessage} have been copied from the template for better context`
      )
    );
  }
  
  console.log(chalk.green("\n🦊 Happy building with Delegation toolkit! 🦊"));
};
