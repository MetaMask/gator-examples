import { PackageManager } from "../types/package-manager";

export const PACKAGE_MANAGER_OPTIONS = (
  Object.keys({ npm: null, yarn: null, pnpm: null } as Record<
    PackageManager,
    null
  >) as PackageManager[]
).map((pm) => ({
  name: pm,
  value: pm,
}));
