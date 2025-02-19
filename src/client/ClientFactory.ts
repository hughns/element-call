/*
Copyright 2025 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only
Please see LICENSE in the repository root for full details.
*/

import { type Session } from "../ClientContext";
import { type InitResult } from "./InitResult";

export interface ClientFactory {
  loadClient(
    loadSession: () => Session | undefined,
    clearSession: () => void,
  ): Promise<InitResult | null>;
}
