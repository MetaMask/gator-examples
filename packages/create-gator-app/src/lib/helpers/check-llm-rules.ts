import fs from "fs";
import path from "path";

export const checkLLMRulesExist = (templatePath: string): boolean => {
  try {
    const llmRulesDirExists = fs.existsSync(
      path.join(templatePath, "llmRules")
    );

    return llmRulesDirExists;
  } catch (error) {
    console.error("Error checking for LLM rules:", error);
    return false;
  }
};
