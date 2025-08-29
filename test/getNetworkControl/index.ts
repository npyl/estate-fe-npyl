import getMockFetch from "./MockFetch";
import getXMLHttpRequestMock from "./MockXMLHttpRequest";

// INFO: Store original implementation
const originalFetch = global.fetch;

const getNetworkControl = async () => {
    const isOnlineRef = { current: true };

    // INFO: Mock fetch for network connectivity checks
    global.fetch = getMockFetch(isOnlineRef, originalFetch);
    global.XMLHttpRequest = getXMLHttpRequestMock(isOnlineRef);

    const goOffline = () => {
        isOnlineRef.current = false;
    };

    const goOnline = () => {
        isOnlineRef.current = true;
    };

    return { goOnline, goOffline };
};

export default getNetworkControl;
