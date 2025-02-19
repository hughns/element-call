/*
Copyright 2025 New Vector Ltd.

SPDX-License-Identifier: AGPL-3.0-only
Please see LICENSE in the repository root for full details.
*/

import { type MatrixClient } from "matrix-js-sdk/src/client";
import { type WidgetApi } from "matrix-widget-api";

export type InitResult = {
  widgetApi: WidgetApi | null;
  client: MatrixClient;
  passwordlessUser: boolean;
};
