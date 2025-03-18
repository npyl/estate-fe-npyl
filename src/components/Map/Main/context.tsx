import {
    createContext,
    FC,
    MutableRefObject,
    PropsWithChildren,
    useContext,
    useRef,
} from "react";

type IState = {
    mapRef: MutableRefObject<google.maps.Map | undefined>;
};

const MapContext = createContext<IState | undefined>(undefined);

const ERROR =
    "MapContext value is undefined. Make sure you use the MapContext before using the context.";

export const useMapContext = () => {
    const context = useContext(MapContext);
    if (context === undefined) {
        throw new Error(ERROR);
    }
    return context;
};

export const MapProvider: FC<PropsWithChildren> = (props) => {
    const mapRef = useRef<google.maps.Map>();

    return (
        <MapContext.Provider
            value={{
                mapRef,
            }}
            {...props}
        />
    );
};
