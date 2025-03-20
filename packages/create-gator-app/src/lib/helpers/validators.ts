export const validateProjectName = (input: string) => {
    return /^[a-zA-Z0-9-_]+$/.test(input);
  };
  