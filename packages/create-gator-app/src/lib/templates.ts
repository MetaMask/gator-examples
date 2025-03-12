import ora from 'ora';
import { spawn } from 'cross-spawn';

export const TEMPLATES = [
    {
      name: "Basic Delegator app with NextJS",
      value: "nextjs-starter",
      description: "A basic Next.js template with App Router",
    }
  ];

export const installProjectDependencies = async (projectPath: string) => {
  const spinners = {
    core: ora('Installing core dependencies...'),
    dev: ora('Installing dev dependencies...'),
    types: ora('Installing type definitions...'),
  };

  try {
    // Install core dependencies
    spinners.core.start();
      await spawn('npm', ['install', '--save'], { cwd: projectPath });
    spinners.core.succeed('Core dependencies installed');

    // Install dev dependencies
    spinners.dev.start();
    await spawn('npm', ['install', '--save-dev'], { cwd: projectPath });
    spinners.dev.succeed('Dev dependencies installed');

    // Install types
    spinners.types.start();
    await spawn('npm', ['install', '--save-dev', '@types/node', '@types/react'], { cwd: projectPath });
    spinners.types.succeed('Type definitions installed');

  } catch (error) {
    // Fail the current active spinner
    Object.values(spinners).forEach(spinner => {
      if (spinner.isSpinning) {
        spinner.fail('Installation failed');
      }
    });
    throw error;
  }
};