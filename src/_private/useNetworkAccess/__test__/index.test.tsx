import Tester, { VALUE_ID, VALUE_ONLINE, VALUE_OFFLINE } from "./Tester";
import getNetworkControl from "./getNetworkControl";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import expectValue from "@/test/expectValue";

const TEST_TIMEOUT = 1000 * 60 * 2;

describe("useNetworkAccess", () => {
    it(
        "disconnect & reconnect",
        async () => {
            // 1. Mount the component
            render(<Tester />);

            // 2. Request network control
            const { goOffline, goOnline } = await getNetworkControl();

            // 3. Simulate & test going OFFLINE
            goOffline();
            await expectValue(VALUE_ID, VALUE_OFFLINE, 5000);

            // 4. Simulate & test going ONLINE
            goOnline();
            await expectValue(VALUE_ID, VALUE_ONLINE, 5000);
        },
        TEST_TIMEOUT
    );
});
