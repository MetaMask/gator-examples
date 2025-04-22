import path from "path";
import fs from "fs-extra";
import IBuilderOptions from "../types/builder-options";

export const copyLLMRulesFiles = (
  options: IBuilderOptions
): boolean => {
  try {
    const { templatePath, targetDir, ideType, template } = options;

    if (!template.areLLMRulesSupported) {
      return false;
    }

    const llmRulesDir = path.join(templatePath, "llmRules");

    // Copy files based on the selected IDE type
    if (ideType === "Cursor") {
      fs.copySync(llmRulesDir, path.join(targetDir, ".cursor"));
      return true;
    } else if (ideType === "Windsurf") {
      fs.copySync(llmRulesDir, path.join(targetDir, ".winsurf"));
      return true;
    } else if (ideType === "Both") {
      // For "Both", we'll copy to both .cursor and .winsurf
      fs.copySync(llmRulesDir, path.join(targetDir, ".cursor"));
      fs.copySync(llmRulesDir, path.join(targetDir, ".winsurf"));
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error copying LLM rules files:", error);
    return false;
  }
};