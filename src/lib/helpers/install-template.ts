import fs from 'fs-extra';

import { configureENV } from './configure-env';
import { BuilderConfig } from '../config';

type TemplateResult = {
  success: boolean;
  message: string;
};

export const installTemplate = async (
  templatePath: string,
  targetDir: string,
  builderConfig: BuilderConfig,
): Promise<TemplateResult> => {
  try {
    const templateFiles = fs.readdirSync(templatePath);

    for (let file of templateFiles) {
      const origFilePath = `${templatePath}/${file}`;

      const fd = fs.openSync(origFilePath, 'r');
      try {
        const stats = fs.fstatSync(fd);

        if (stats.isFile()) {
          let contents = fs.readFileSync(fd, 'utf8');

          if (file === '.env.example') {
            file = '.env';
            contents = configureENV(contents, builderConfig);
          }

          const writePath = `${targetDir}/${file}`;
          fs.writeFileSync(writePath, contents, 'utf8');
        } else if (stats.isDirectory()) {
          fs.mkdirSync(`${targetDir}/${file}`);

          await installTemplate(
            `${templatePath}/${file}`,
            `${targetDir}/${file}`,
            builderConfig,
          );
        }
      } finally {
        fs.closeSync(fd);
      }
    }

    return { success: true, message: 'Template installed successfully' };
  } catch (error) {
    return {
      success: false,
      message: `Failed to install template: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
};
