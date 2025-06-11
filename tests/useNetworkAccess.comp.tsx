import { useState } from "react";
import useNetworkAccess, { POLLING } from "../src/_private/useNetworkAccess";

const CHECK_DEFAULT = { checkInterval: POLLING.RAPID };

const VALUE_ID = "value-id";

const VALUE_DISCONNECT = "DISCONNECT";
const VALUE_RECONNECT = "RECONNECT";

const Tester = () => {
    const [value, setValue] = useState("");

    const onChange = (b: boolean) => {
        if (!b) setValue(VALUE_DISCONNECT);
        else if (value === VALUE_DISCONNECT) setValue(VALUE_RECONNECT); // INFO: this means we are reconnecting (after a disconnect)
    };

    useNetworkAccess(onChange, CHECK_DEFAULT);

    return <div data-testid={VALUE_ID}>{value}</div>;
};

export {
    VALUE_ID,
    // ...
    VALUE_DISCONNECT,
    VALUE_RECONNECT,
};
export default Tester;
