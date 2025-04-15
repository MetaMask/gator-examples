export const isWeb3AuthSupported = (template: string) => {
  const supportedTemplates = ["starter"];
  return supportedTemplates.includes(template);
};
