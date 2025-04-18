import { Answers } from "inquirer";
import { TEMPLATE_OPTIONS } from "../choices/templates";
import { ITemplate } from "../types/template";

export const resolveTemplate = (answers: Answers): ITemplate => {
    const selectedTemplate = TEMPLATE_OPTIONS.find(t => t.value === answers.template && t.framework === answers.framework);
    if (!selectedTemplate) {
        throw new Error(`Template ${answers.template} not found for framework ${answers.framework}`);
    }
    return selectedTemplate;
}