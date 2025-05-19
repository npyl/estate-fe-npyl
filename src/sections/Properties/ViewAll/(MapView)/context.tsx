import { createContext, useCallback, useContext, useRef } from "react";

type TMarker = google.maps.Marker;

type State = {
    onMarkerLoad: (propertyId: number, m: TMarker) => void;
    getByPropertyId: (propertyId: number) => TMarker | undefined;
};

const MarkerRefsContext = createContext<State>({
    onMarkerLoad() {},
    getByPropertyId(propertyId) {
        return undefined;
    },
});

export const useMarkerRefsContext = () => {
    const context = useContext(MarkerRefsContext);
    if (context === undefined) {
        throw new Error(
            "MarkerRefsContext value is undefined. Make sure you use the MarkerRefsContext before using the context."
        );
    }
    return context;
};

export const MarkerRefsProvider: React.FC<React.PropsWithChildren<unknown>> = (
    props
) => {
    const refs = useRef<Map<number, TMarker>>(new Map());

    const onMarkerLoad = useCallback((propertyId: number, m: TMarker) => {
        refs.current.set(propertyId, m);
    }, []);

    const getByPropertyId = useCallback((propertyId: number) => {
        return refs.current.get(propertyId);
    }, []);

    return (
        <MarkerRefsContext.Provider
            value={{
                onMarkerLoad,
                getByPropertyId,
            }}
            {...props}
        />
    );
};
