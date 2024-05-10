import { IMapCoordinates, ShapeData } from "@/components/Map/types";
import Iconify from "@/components/iconify";
import Button from "@mui/material/Button";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props {
    shapes: ShapeData[];
    onChange: (l: IMapCoordinates) => void;
}

const NextShapeCenter = ({ shapes, onChange }: Props) => {
    const { t } = useTranslation();

    const [index, setIndex] = useState(0);

    const handleClick = useCallback(() => {
        // Reached End; Counter Reset
        if (index + 1 >= shapes.length) {
            setIndex(0);

            const center = getShapeCenter(shapes[0]);
            if (!center) return;
            onChange(center);

            return;
        }

        // Get next shape's center
        setIndex((old) => old + 1);

        const center = getShapeCenter(shapes[index]);
        if (!center) return;
        onChange(center);
    }, [shapes, index]);

    return (
        <Button
            onClick={handleClick}
            endIcon={<Iconify icon="mdi:target" width={25} height={25} />}
        >
            {t("Next Shape")}
        </Button>
    );
};

const getShapeCenter = (s: ShapeData) => {
    if (s.type === "Polygon") return getPolygonCentroid(s.paths);
    if (s.type === "Circle") return { lat: s.lat, lng: s.lng };
    if (s.type === "Rectangle")
        return getRectangleCenter(s.nelat, s.nelng, s.swlat, s.swlng);
};

function getPolygonCentroid(
    paths: google.maps.LatLngLiteral[][]
): google.maps.LatLngLiteral {
    let lat = 0,
        lng = 0,
        totalPoints = 0;
    for (const path of paths) {
        for (const point of path) {
            lat += point.lat;
            lng += point.lng;
            totalPoints++;
        }
    }
    return { lat: lat / totalPoints, lng: lng / totalPoints };
}

function getRectangleCenter(
    nelat: number,
    nelng: number,
    swlat: number,
    swlng: number
): google.maps.LatLngLiteral {
    return {
        lat: (nelat + swlat) / 2,
        lng: (nelng + swlng) / 2,
    };
}

export default NextShapeCenter;
