import fs from "fs-extra";
import { configureENV } from "./configure-env";
import { Answers } from "inquirer";

export const installTemplate = (
  templatePath: string,
  targetDir: string,
  answers: Answers
) => {
  const templateFiles = fs.readdirSync(templatePath);

  // Iterate over all files in the template directory
  for (let file of templateFiles) {
    const origFilePath = `${templatePath}/${file}`;

    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, "utf8");

      if (file === ".env.example") {
        file = ".env";
        contents = configureENV(contents, answers);
      }

      const writePath = `${targetDir}/${file}`;
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${targetDir}/${file}`);

      // Recursively install the template for the subdirectory
      installTemplate(
        `${templatePath}/${file}`,
        `${targetDir}/${file}`,
        answers
      );
    }
  }
};
