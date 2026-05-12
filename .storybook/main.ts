import type { StorybookConfig } from '@storybook/web-components-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/web-components-vite',
  viteFinal: async (viteConfig) => {
    const { default: rootViteConfig } = await import('../vite.config.ts');
    return mergeConfig(viteConfig, rootViteConfig);
  },
};

export default config;
