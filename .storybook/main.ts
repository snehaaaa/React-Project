import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  // No addons needed for Essentials, Links, or Interactions—they’re in the core now
  viteFinal: async (config) => {
    config.define = {
      ...(config.define || {}),
      "crypto.hash": "undefined", // workaround for Node 22 + Vite crypto bug
    };
    return config;
  },
};

export default config;
