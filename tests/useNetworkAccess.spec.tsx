import { test } from "@playwright/experimental-ct-react";
import getNetworkControl from "./_util/network/getControl";
import expectValue from "./_util/expectValue";
import Tester from "./useNetworkAccess.comp";
import {
    VALUE_ID,
    VALUE_DISCONNECT,
    VALUE_RECONNECT,
} from "./useNetworkAccess.comp";
import React from "react";

const DELAY = 1000 * 30;

test("Disconnect & Reconnect", async ({ mount, context, page }) => {
    const component = await mount(<Tester />);

    test.setTimeout(DELAY * 2);

    const { goOffline, reset } = await getNetworkControl(context, page);

    await goOffline();
    await expectValue(component, VALUE_ID, VALUE_DISCONNECT, DELAY);

    await reset();
    await expectValue(component, VALUE_ID, VALUE_RECONNECT, DELAY);
});
