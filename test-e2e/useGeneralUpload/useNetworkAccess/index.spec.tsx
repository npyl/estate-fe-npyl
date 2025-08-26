import { test } from "@playwright/experimental-ct-react";
import { expect } from "@playwright/test";
import Tester from "./Tester";
import { VALUE_ID, VALUE_ONLINE, VALUE_OFFLINE } from "./Tester";
import getNetworkControl from "../_util/getNetworkControl";

test("disconnect & reconnect", async ({ mount, page }) => {
    // 1. Mount the component
    const component = await mount(<Tester />);

    // 2. Request network control
    const { goOffline, goOnline } = await getNetworkControl(page);

    // 3. Get value id element
    const valueLocator = component.getByTestId(VALUE_ID);

    // 4. Simulate & test going OFFLINE
    goOffline();
    await expect(valueLocator).toHaveText(VALUE_OFFLINE, { timeout: 5000 });

    // 5. Simulate & test going ONLINE
    goOnline();
    await expect(valueLocator).toHaveText(VALUE_ONLINE, { timeout: 5000 });
});
