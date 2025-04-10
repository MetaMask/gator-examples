import fs from "fs";
import path from "path";

export const checkLLMRulesExist = (templatePath: string): boolean => {
  try {
    const llmRulesDirExists = fs.existsSync(
      path.join(templatePath, "llmRules")
    );

    return llmRulesDirExists;
  } catch (error) {
    return false;
  }
};
