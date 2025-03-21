import { Framework } from "../types/framework";

export const FRAMEWORK_OPTIONS = (
  Object.keys({ nextjs: null, "vite-react": null } as Record<
    Framework,
    null
  >) as Framework[]
).map((framework) => ({
  name: framework,
  value: framework,
}));
