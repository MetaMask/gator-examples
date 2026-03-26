import chalk from 'chalk';

import IBuilderOptions from '../types/builder-options';

export const displayOutro = (options: IBuilderOptions) => {
  console.log(chalk.cyan('\n🚀 Next steps:'));
  console.log(chalk.white(`  1. cd ${options.projectName}`));
  console.log(chalk.white(`  2. Update the .env file variables`));
  if (options.packageManager === 'npm') {
    console.log(chalk.white(`  3. ${options.packageManager} run dev`));
  } else {
    console.log(chalk.white(`  3. ${options.packageManager} dev`));
  }

  if (options.addWeb3auth) {
    console.log(chalk.cyan('\n🛠 Web3Auth:'));

    if (options.template.isWeb3AuthSupported) {
      console.log(chalk.white('  • Web3Auth has been added to the project'));
    } else {
      console.log(
        chalk.yellow(
          '  • Web3Auth was not added to the project because it is not supported for this template',
        ),
      );
    }
  }

  console.log(chalk.cyan('\n📚 Documentation:'));
  console.log(
    chalk.white(
      '  • Learn more about MetaMask Smart Accounts Kit: https://docs.metamask.io/smart-accounts-kit',
    ),
  );

  console.log(chalk.green('\n🦊 Happy building with Smart Accounts Kit! 🦊'));
};
