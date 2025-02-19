import { defineConfig, mergeConfig } from "vite";
import standaloneConfig from "./vite.config";
import generateFile from "vite-plugin-generate-file";
import { createHtmlPlugin } from "vite-plugin-html";
import del from "rollup-plugin-delete";

const base = "./";

// Config for embedded deployments (possibly hosted under a non-root path)
export default defineConfig((env) =>
  mergeConfig(
    standaloneConfig(env),
    defineConfig({
      base, // Use relative URLs to allow the app to be hosted under any path
      publicDir: false, // Don't serve the public directory which only contains the favicon
      plugins: [
        createHtmlPlugin({
          entry: "src/main/embeddedWidgetOnly.tsx",
          inject: {
            data: {
              title: env.VITE_PRODUCT_NAME || "Element Call",
            },
          },
        }),
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
        // WARNING: This is a nasty workaround
        // Despite refactoring our React entrypoints to split out widget vs SPA mode, the way that matrix-js-sdk is
        // currently implemented means that the matrix-sdk-crypto-wasm files are included in the
        // bundle even though they are never used at runtime. A prototype of a refactored matrix-js-sdk that should
        // mean that you can use the RoomWidgetClient but without any dependency on rust-crypto still confused
        // vite, so this workaround has is done instead.
        del({
          targets: [
            "dist/assets/matrix-sdk-crypto-wasm*",
            "dist/assets/matrix_sdk_crypto_wasm*",
          ],
          hook: "closeBundle",
        }),
      ],
    }),
  ),
);
