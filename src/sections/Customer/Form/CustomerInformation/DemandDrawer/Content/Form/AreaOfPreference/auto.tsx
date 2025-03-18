//
//  This component auto-centers the Map when it loads (component mount).
//  A load happens when is parent (the demands drawer) becomes visible (this works with keepMounted aswell!)
//

import { IMapCoordinates } from "@/components/Map/types";
import { getShapeCenter } from "@/components/Map/util";
import { TShape } from "@/types/shape";
import { useEffect } from "react";

interface AutoCenterProps {
    shape: TShape;
    onCenter: (l: IMapCoordinates) => void;
}

const AutoCenter = ({ shape, onCenter }: AutoCenterProps) => {
    useEffect(() => {
        const center = getShapeCenter(shape);
        if (!center) return;
        onCenter(center);
    }, []);

    return null;
};

export default AutoCenter;
