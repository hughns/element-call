/*
Copyright 2025 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only
Please see LICENSE in the repository root for full details.
*/

import { widget } from "../widget";
import { type ClientFactory } from "./ClientFactory";
import { type InitResult } from "./InitResult";
import { type Session } from "../ClientContext";

export class DualModeClientFactory implements ClientFactory {
  public async loadClient(
    loadSession: () => Session | undefined,
    clearSession: () => void,
  ): Promise<InitResult | null> {
    // we lazy-load the correct factory to avoid unnecessary dependencies
    let factory: ClientFactory;
    if (widget) {
      const { EmbeddedWidgetClientFactory } = await import(
        "./EmbeddedWidgetClientFactory"
      );
      factory = new EmbeddedWidgetClientFactory();
    } else {
      const { SPAClientFactory } = await import("./SPAClientFactory");
      factory = new SPAClientFactory();
    }
    return factory.loadClient(loadSession, clearSession);
  }
}
