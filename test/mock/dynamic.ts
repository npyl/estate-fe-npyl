const mockNextDynamic = () => {
    jest.mock("next/dynamic", () => ({
        __esModule: true,
        default: (importFn: () => Promise<any>) => {
            const Component = () => null;
            Component.displayName = "DynamicComponent";
            return Component;
        },
    }));
};

export default mockNextDynamic;
