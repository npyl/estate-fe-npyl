import { useCallback, useState } from "react";
import Map, { DrawShape, IMapAddress, StopDraw } from "@/components/Map";
import { TShape } from "@/types/shape";
import { drawingToPoints } from "@/components/Map/util";
import { CLICK_RES_ID, MAP_ID, SHAPE_RES_ID, ZOOM } from "./constants";
import MapList from "./MapList";
import { IClickRes } from "./type";

const Tester = () => {
    const [clickRes, setClickRes] = useState<IClickRes>();
    const onMapClick = useCallback(
        (lat: number, lng: number, address: IMapAddress) =>
            setClickRes({ lat, lng, address }),
        []
    );

    // -------------------------------------------------------------

    const [shape, setShape] = useState<TShape>();
    const onDraw = useCallback((s: DrawShape | StopDraw) => {
        if (!s) setShape(undefined);
        else setShape(drawingToPoints(s));
    }, []);

    return (
        <div>
            <div
                data-testid={MAP_ID}
                style={{ width: "800px", height: "600px" }}
            >
                <Map
                    drawing
                    search
                    shapes={shape ? [shape] : []}
                    zoom={ZOOM}
                    onClick={onMapClick}
                    onSearchSelect={onMapClick}
                    onDraw={onDraw}
                >
                    <MapList />
                </Map>
            </div>

            {shape ? (
                <div data-testid={SHAPE_RES_ID}>{JSON.stringify(shape)}</div>
            ) : null}

            {/* Click Result */}
            {clickRes ? (
                <div data-testid={CLICK_RES_ID}>{JSON.stringify(clickRes)}</div>
            ) : null}
        </div>
    );
};

export default Tester;
