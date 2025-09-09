const triggerEvent = (
    mockCb: jest.SpyInstance,
    event: string,
    ...args: any[]
) => {
    const onEventCb = mockCb.mock.calls.find((call) => call[0] === event)[1];
    return onEventCb(...args);
};

export default triggerEvent;
