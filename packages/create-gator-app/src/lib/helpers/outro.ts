import chalk from "chalk";
import IBuilderOptions from "../types/builder-options";

export const displayOutro = (options: IBuilderOptions) => {
  console.log(chalk.cyan("\n🚀 Next steps:"));
  console.log(chalk.white(`  1. cd ${options.projectName}`));
  console.log(chalk.white(`  2. Update the .env file variables`));
  if (options.packageManager === "npm") {
    console.log(
      chalk.white(`  3. ${options.packageManager} run dev`)
    );
  } else {
    console.log(
      chalk.white(`  3. ${options.packageManager} dev`)
    );
  }
  
  if (options.addLLMRules) {
    console.log(chalk.cyan("\n🤖 LLM Context:"));
    let ideMessage = "";
    
    if (options.ideType === "Cursor") {
      ideMessage = "Cursor";
    } else if (options.ideType === "Windsurf") {
      ideMessage = "Windsurf";
    } else if (options.ideType === "Both") {
      ideMessage = "Cursor and Windsurf";
    }
    
    if(options.template.areLLMRulesSupported) {
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

  if (options.addWeb3auth) {
    console.log(chalk.cyan("\n🛠 Web3Auth:"));

    if(options.template.isWeb3AuthSupported) {
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
      "  • Learn more about Delegation toolkit: https://docs.metamask.io/delegation-toolkit"
    )
  );
  
  console.log(chalk.green("\n🦊 Happy building with Delegation toolkit! 🦊"));
};
