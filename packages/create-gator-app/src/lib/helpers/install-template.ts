import fs from "fs-extra";
import path from "path";
import { configureENV } from "./configure-env";
import GatorAppConfiguration from "../types/gator-app-configuration";
import { copyLLMRulesFiles } from "./copy-llm-rules";

interface TemplateResult {
  success: boolean;
  message: string;
}

export const installTemplate = async (
  templatePath: string,
  targetDir: string,
  gatorAppConfiguration: GatorAppConfiguration
): Promise<TemplateResult> => {
  try {
    const templateFiles = fs.readdirSync(templatePath);

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
        if (file === "llmRules") {
          if (gatorAppConfiguration.llmRules) {
            const ideType = gatorAppConfiguration.ideType || "Both";
            copyLLMRulesFiles(templatePath, targetDir, ideType);
          }
          continue;
        }

        fs.mkdirSync(`${targetDir}/${file}`);

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
      message: `Failed to install template: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
};
