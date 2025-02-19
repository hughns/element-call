/*
Copyright 2025 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only
Please see LICENSE in the repository root for full details.
*/

import { logger } from "matrix-js-sdk/src/logger";

import { widget } from "../widget";
import { type ClientFactory } from "./ClientFactory";
import { type InitResult } from "./InitResult";
import { type Session } from "../ClientContext";

export class EmbeddedWidgetClientFactory implements ClientFactory {
  public async loadClient(
    loadSession: () => Session | undefined,
    clearSession: () => void,
  ): Promise<InitResult | null> {
    if (!widget) {
      throw new Error("This client factory can only be used inside a widget");
    }
    // We're inside a widget, so let's engage *matryoshka mode*
    logger.log("Using a matryoshka client");
    const client = await widget.client;
    return {
      widgetApi: widget.api,
      client,
      passwordlessUser: false,
    };
  }
}
