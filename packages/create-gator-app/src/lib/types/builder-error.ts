export class BuilderError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = "BuilderError";
  }

  static fromError(error: unknown, code: string): BuilderError {
    if (error instanceof BuilderError) {
      return error;
    }
    return new BuilderError(
      error instanceof Error ? error.message : String(error),
      code,
      error
    );
  }
}

export const ErrorCodes = {
  PROJECT_EXISTS: "PROJECT_EXISTS",
  TEMPLATE_COPY_FAILED: "TEMPLATE_COPY_FAILED",
  DEPENDENCY_INSTALLATION_FAILED: "DEPENDENCY_INSTALLATION_FAILED",
  WEB3AUTH_CONFIG_FAILED: "WEB3AUTH_CONFIG_FAILED",
  PACKAGE_CONFIG_FAILED: "PACKAGE_CONFIG_FAILED",
} as const;
