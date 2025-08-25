import { useMemo } from "react";
import isPositionValid from "../../util/validation";
import { patrasLatLng } from "../../constants";
import { IMapCoordinates } from "../../types";

const useCenter = (center: IMapCoordinates) =>
    useMemo(() => {
        if (!isPositionValid(center)) return patrasLatLng;
        return center;
    }, [center]);

export default useCenter;
