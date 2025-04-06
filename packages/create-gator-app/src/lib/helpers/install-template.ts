import fs from "fs-extra";
import { configureENV } from "./configure-env";
import GatorAppConfiguration from "../types/gator-app-configuration";

export const installTemplate = async (
  templatePath: string,
  targetDir: string,
  gatorAppConfiguration: GatorAppConfiguration
): Promise<{ success: boolean; message: string }> => {
  try {
    const templateFiles = fs.readdirSync(templatePath);

    // Iterate over all files in the template directory
    for (let file of templateFiles) {
      const origFilePath = `${templatePath}/${file}`;

      const stats = fs.statSync(origFilePath);

      if (stats.isFile()) {
        let contents = fs.readFileSync(origFilePath, "utf8");

        if (file === ".env.example") {
          file = ".env";
          contents = configureENV(contents, gatorAppConfiguration);
        }

        const writePath = `${targetDir}/${file}`;
        fs.writeFileSync(writePath, contents, "utf8");
      } else if (stats.isDirectory()) {
        fs.mkdirSync(`${targetDir}/${file}`);

        // Recursively install the template for the subdirectory
        await installTemplate(
          `${templatePath}/${file}`,
          `${targetDir}/${file}`,
          gatorAppConfiguration
        );
      }
    }
    
    return { success: true, message: "Template installed successfully" };
  } catch (error) {
    return { 
      success: false, 
      message: `Failed to install template: ${error instanceof Error ? error.message : String(error)}` 
    };
  }
};
