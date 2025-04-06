import chalk from "chalk";

export function displayIntro(): void {
  console.log(
    chalk.green(`                                                
                 ##***=====*%%                             
                #%*--=*##**#@#%                            
            *##*=*-----%%##****%%                          
          #***+--+------=**==-==*%#*######                 
          #++=---==------===+===+#@@@@@@@@%                
         %%*==----==----=*=---#@@@@@@@@@@@                 
         %#*===---====*=---=%@@@@%@@%@@                    
          %%*+===+*#+===+#@@@%%#*+====*#%*****%            
     @%**#%%#*#@@@@@@@@@#@@@@@@@@#*#*%@@@@@@*#@            
     @@@%@@@@@@@@@@@@@@@*@@@@@@@@%@@@*@@@@@@*@             
       %%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#@  #%*##       
          %*#@@@@@%%%%*%@@@@@@@%@%*****#%*+*###****#*%     
          *#@@@@%%%*===+*%@@@@@@#**+=+++++==**+***+#**@    
           %@@%%%%*=#*==*%*=+====+=============+=====*%    
          ##@@@%%@**#===+=*@%+===-===================+%    
           #@@@%%@@#*+===+***%#%@@%*=--===-=--==*#@%%@     
          %#%@@@%%%@@%#*+===+*%@#**#@@%%%%%%%%@%#%@%#      
          #%@@@@%%%%%%@@@@@@@@%+*#%##%*****=+#%%@          
          %@@%%@@@%*+*****%#***#%#%@  @@%%@@               
         ##@@@@@%%@%+***===++***@@@%%                      
        #%%@@@@%%%@@@#+=======+#@@@@%#                     
       #%%%@%@@@@@@@@@#+=----=+*@@@@@%%                    
      @@@#@@%@@@@@@@@@@*==---==+@@@@@@%%                   
      %****#@@@@@@@@@@@@*==--===%@@@@@@#%                  
     %#*****#@@@@@@@%%%%@*==-==*%%%@@@@**                  
     %#****%@@@@@@@@%%%%%@#=--*%%%%%@@%===#                
         **%@@@@@@@@%%%%%%%@@@%%%%%@@@@%+=*                
                          %%%%%%     @                                                    
                                                              
          MᴇᴛᴀMᴀsᴋ Dᴇʟᴇɢᴀᴛɪᴏɴ Tᴏᴏʟᴋɪᴛ`)
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
