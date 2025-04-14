export const isWebAuthSupported = (template: string) => {
  const supportedTemplates = ["starter"];
  return supportedTemplates.includes(template);
};
