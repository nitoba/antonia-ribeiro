// @ts-check
import { defineConfig, envField } from "astro/config";

import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "server",

  env: {
    schema: {
      USER_EMAIL: envField.string({ context: "server", access: "secret" }),
      EMAIL_PASSWORD: envField.string({ context: "server", access: "secret" }),
      MERCADO_PAGO_ACCESS_TOKEN: envField.string({
        context: "server",
        access: "secret",
      }),
      MERCADO_PAGO_WEBHOOK_SECRET: envField.string({
        context: "server",
        access: "secret",
      }),
      CAL_API_KEY: envField.string({
        context: "server",
        access: "secret",
        startsWith: "cal_",
      }),
      CAL_EVENT_URL: envField.string({
        context: "client",
        access: "public",
        url: true,
      }),
      APP_BASE_URL: envField.string({
        context: "server",
        access: "public",
        url: true,
      }),
    },
  },

  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],

  adapter: vercel({}),
});
