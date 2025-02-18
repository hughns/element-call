import { defineConfig, mergeConfig } from "vite";
import standaloneConfig from "./vite.config";
import generateFile from "vite-plugin-generate-file";
import { createHtmlPlugin } from "vite-plugin-html";

const base = "./";

// Config for embedded deployments (possibly hosted under a non-root path)
export default defineConfig((env) =>
  mergeConfig(
    standaloneConfig(env),
    defineConfig({
      base, // Use relative URLs to allow the app to be hosted under any path
      plugins: [
        generateFile([
          {
            type: "json",
            output: "./config.json",
            data: {
              matrix_rtc_session: {
                key_rotation_on_leave_delay: 15000,
                membership_keep_alive_period: 5000,
                membership_server_side_expiry_timeout: 15000,
              },
            },
          },
        ]),
      ],
    }),
  ),
);
