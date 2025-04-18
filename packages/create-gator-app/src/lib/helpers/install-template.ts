import fs from "fs-extra";
import path from "path";
import { configureENV } from "./configure-env";
import { copyLLMRulesFiles } from "./copy-llm-rules";
import { BuilderConfig } from "../config";

interface TemplateResult {
  success: boolean;
  message: string;
}

export const installTemplate = async (
  templatePath: string,
  targetDir: string,
  builderConfig: BuilderConfig
): Promise<TemplateResult> => {
  try {
    const options = builderConfig.getOptions();
    const templateFiles = fs.readdirSync(templatePath);

    for (let file of templateFiles) {
      const origFilePath = `${templatePath}/${file}`;

      const stats = fs.statSync(origFilePath);

      if (stats.isFile()) {
        let contents = fs.readFileSync(origFilePath, "utf8");

        if (file === ".env.example") {
          file = ".env";
          contents = configureENV(contents, builderConfig);
        }

        const writePath = `${targetDir}/${file}`;
        fs.writeFileSync(writePath, contents, "utf8");
      } else if (stats.isDirectory()) {
        if (file === "llmRules") {
          if (builderConfig.shouldAddLLMRules()) {
            copyLLMRulesFiles(options);
          }
          continue;
        }

        fs.mkdirSync(`${targetDir}/${file}`);

        await installTemplate(
          `${templatePath}/${file}`,
          `${targetDir}/${file}`,
          builderConfig
        );
      }
    }

    return { success: true, message: "Template installed successfully" };
  } catch (error) {
    return {
      success: false,
      message: `Failed to install template: ${error instanceof Error ? error.message : String(error)
        }`,
    };
  }
};
