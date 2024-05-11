import { IMapCoordinates, ShapeData } from "@/components/Map/types";
import { getShapeCenter } from "@/components/Map/util";
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

    const next = (index + 1 >= shapes?.length ? 0 : index + 1) + 1;

    const handleClick = useCallback(() => {
        //
        // Reached End; Counter Reset
        //
        if (index + 1 >= shapes.length) {
            setIndex(0);

            const center = getShapeCenter(shapes[0]);
            if (!center) return;
            onChange(center);

            return;
        }

        //
        // Get next shape's center
        //
        setIndex((old) => old + 1);

        const center = getShapeCenter(shapes[index + 1]);
        if (!center) return;
        onChange(center);
    }, [shapes, index]);

    return (
        <Button
            onClick={handleClick}
            startIcon={<Iconify icon="mdi:target" width={25} height={25} />}
        >
            {t("Next Shape")} (No.{next})
        </Button>
    );
};

export default NextShapeCenter;
