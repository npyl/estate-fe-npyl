import { useCallback, useState } from "react";
import useNetworkAccess, {
    POLLING,
} from "../../../src/_private/useNetworkAccess";

const VALUE_ID = "value-id";
const VALUE_OFFLINE = "OFFLINE";
const VALUE_ONLINE = "ONLINE";

const CHECK_DEFAULT = { checkInterval: POLLING.RAPID };

const Tester = () => {
    const [status, setStatus] = useState("Checking...");

    const onChange = useCallback(
        (isOnline: boolean) =>
            setStatus(isOnline ? VALUE_ONLINE : VALUE_OFFLINE),
        []
    );

    useNetworkAccess(onChange, CHECK_DEFAULT);

    return (
        <div>
            <div data-testid={VALUE_ID}>{status}</div>
        </div>
    );
};

export { VALUE_ID, VALUE_OFFLINE, VALUE_ONLINE };
export default Tester;
