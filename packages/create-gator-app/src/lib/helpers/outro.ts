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
  
  if (gatorAppConfiguration.addLLMRules) {
    console.log(chalk.cyan("\n🤖 LLM Context:"));
    let ideMessage = "";
    
    if (gatorAppConfiguration.ideType === "Cursor") {
      ideMessage = "Cursor";
    } else if (gatorAppConfiguration.ideType === "Windsurf") {
      ideMessage = "Windsurf";
    } else if (gatorAppConfiguration.ideType === "Both") {
      ideMessage = "Cursor and Windsurf";
    }
    
    if(gatorAppConfiguration.areLLMRulesAvailable) {
      console.log(
        chalk.white(
          `  • LLM rules files for ${ideMessage} have been copied from the template for better context`
        )
      );
    } else {
      console.log(
        chalk.yellow(
          `  • LLM rules were not added for ${ideMessage} because they are not available for this template`
        )
      );
    }
  }

  if (gatorAppConfiguration.addWeb3auth) {
    console.log(chalk.cyan("\n🛠 Web3Auth:"));

    if(gatorAppConfiguration.isWebAuthSupported) {
      console.log(
        chalk.white(
          "  • Web3Auth has been added to the project"
        )
      );
    } else {
      console.log(
        chalk.yellow(
          "  • Web3Auth was not added to the project because it is not supported for this template"
        )
      );
    }
  }

  console.log(chalk.cyan("\n📚 Documentation:"));
  console.log(
    chalk.white(
      "  • Learn more about Delegation toolkit: https://docs.gator.metamask.io/"
    )
  );
  
  console.log(chalk.green("\n🦊 Happy building with Delegation toolkit! 🦊"));
};
