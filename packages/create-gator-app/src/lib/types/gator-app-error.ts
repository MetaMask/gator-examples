export class GatorAppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = "GatorAppError";
  }

  static fromError(error: unknown, code: string): GatorAppError {
    if (error instanceof GatorAppError) {
      return error;
    }
    return new GatorAppError(
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
