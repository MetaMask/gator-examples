import fs from "fs-extra";

export const installTemplate = (
  templatePath: string,
  targetDir: string,
  useEmbeddedWallet: boolean
) => {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;

    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, "utf8");

      if (file === ".env.example") {
        file = ".env";
        if (useEmbeddedWallet) {
          contents = contents + "\nNEXT_PUBLIC_WEB3AUTH_CLIENT_ID=YOUR_WEB3AUTH_CLIENT_ID_FOR_SAPPHIRE_DEVNET";
        }
      }

      const writePath = `${targetDir}/${file}`;
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${targetDir}/${file}`);

      installTemplate(
        `${templatePath}/${file}`,
        `${targetDir}/${file}`,
        useEmbeddedWallet
      );
    }
  });
};
