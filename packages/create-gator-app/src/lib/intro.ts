import chalk from "chalk";

export function displayIntro(): void {
  console.log(
    chalk.green(`
       &&$Xxxx                                  xxxX$&&       
       &&&&$$xxxxxx                        xxxxxx$$&&&&       
      &&&&&&&&$Xxxxxxxxx              xxxxxxxxx$&&&&&&&&      
      &&&&&&&&&&$$xxxxxxx++++++++++++xxxxxxx$$&&&&&&&&&&&     
      &&&&&&&&&&&&&$xxxxxx++++++++++xxxxxx$&&&&&&&&&&&&&&     
      &&&&&&&&&&&&&&&$Xxxxx++++++++xxxxX$&&&&&&&&&&&&&&&      
      &&&&&&&&&&&&&&&&&&$xx++++++++xx$&&&&&&&&&&&&&&&&&&      
       &&&&&&&&&&&&&&&&&&&$x+++++xx$&&&&&&&&&&&&&&&&&&&&      
      &&&&&&&&&&&&&&&&&&$xxx++++++xxx$&&&&&&&&&&&&&&&&&&      
       &&&&&&&&&&&&&&&$xxxxx++++++xxxxx$&&&&&&&&&&&&&&&&      
       &&&&&&&&&&&&$Xxxxxxxx++++++xxxxxxxX$&&&&&&&&&&&&       
       &&&&&$$Xxxxxxxxxxxxxxx++++xxxxxxxxxxxxxxX$$&&&&&       
         xxx+++++xxxxxxxxxxxx+++++xxxxxxxxxxx++++xxxx         
        x++++++++xxxxxxxxxxx+++++xxxxxxxxxxxxx++++++++        
        +++++++++xxxxxxxxxxxx++++xxxxxxxxxxx+++++++++x        
       +++++++++++xxxxX&&&xxx++++xxx&&&Xxxxx++++++++++x       
       x+++++++++++xxx++xxxxx++++xxxxx++xx+++++++++++++x      
      x+++++++++++++xx+++++xx++++xx+++++xx++++++++++++++      
      xxxxxxxxxxxxxxxxx++++xx++++xx++++xxxxxxxxxxxxxxxxx      
      xxxxxxxxxxxxxxxxxxxx++x+++++++xxxxxxxxxxxxxxxxxxxx      
       xxxxxxxxxxxxxxxxxxx+X&&&&&&$+xxxxxxxxxxxxxxxxxxx       
       xxxxxxxxxxxxxxxx;;::&&&&&&&&::;;xxxxxxxxxxxxxxxx       
        xxxxxxxxxxxxx;::::;&&&&&&&&;:::::xxxxxxxxxxxxx        
        xxxxxxxx      ;::::::;::;::::::;      xxxxxxxx        
                         ;;::;::;::;;                      
                         
                 MᴇᴛᴀMᴀsᴋ Dᴇʟᴇɢᴀᴛɪᴏɴ Tᴏᴏʟᴋɪᴛ                      
                         
                         `)
  );

  console.log(chalk.yellow.bold("\n⚠️  PRIVATE ALPHA WARNING ⚠️"));
  console.log(
    chalk.yellow(
      "This product is in private alpha and uses private packages like @metamask-private/delegator-core-viem"
    )
  );
  console.log(
    chalk.yellow(
      "A temporary NPM token will be provided by the CLI for installation."
    )
  );
  console.log(
    chalk.yellow(
      "After installation, this token will be replaced with a placeholder in your .npmrc file.\n"
    )
  );

  try {
    // Try to display fancy box for About section
    console.log(chalk.cyan.bold("🦊 About MetaMask Delegator:"));
    console.log(
      chalk.cyan(`
┌─────────────────────────────────────────────────────────────┐
│ MetaMask Delegator enables embedded smart contract accounts │
│ that can delegate permissions to other addresses, creating  │
│ a powerful authorization system for your dApp.              │
│                                                             │
│ Key features:                                               │
│ • Permission management at the account level                │
│ • Customizable authorization logic                          │
│ • Delegation and redelegation capabilities                  │
│ • Counterfactual account initialization                     │
└─────────────────────────────────────────────────────────────┘`)
    );
  } catch (e) {
    // Fallback to simple text if box drawing fails
    console.log(chalk.cyan.bold("\n🦊 About MetaMask Delegator:"));
    console.log(
      chalk.cyan("MetaMask Delegator enables embedded smart contract accounts")
    );
    console.log(
      chalk.cyan("that can delegate permissions to other addresses, creating")
    );
    console.log(chalk.cyan("a powerful authorization system for your dApp."));
    console.log(chalk.cyan("\nKey features:"));
    console.log(chalk.cyan("• Permission management at the account level"));
    console.log(chalk.cyan("• Customizable authorization logic"));
    console.log(chalk.cyan("• Delegation and redelegation capabilities"));
    console.log(chalk.cyan("• Counterfactual account initialization\n"));
  }
} 