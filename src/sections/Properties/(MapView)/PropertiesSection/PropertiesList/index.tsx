import { Grid } from "@mui/material";
import PropertyCard, { PropertyCardH } from "@/components/Cards/PropertyCard";
import { IPropertyResultResponse } from "@/types/properties";
import Placeholder from "./Placeholder";
import useResponsiveOrientation from "./hook";
import FlipOrientationButton from "./FlipOrientationButton";
import { FC, useCallback } from "react";
import { useMarkerRefsContext } from "../../context";
import sleep from "@/utils/sleep";

// ---------------------------------------------------------------------------------

const NORMAL = "/static/map/mapIcon.svg";
const ACTIVE = "/static/map/mapIcon_Active.svg";

interface GridItemProps {
    orientation: boolean;
    item: IPropertyResultResponse;
}

const GridItem: FC<GridItemProps> = ({ orientation, item }) => {
    const { getByPropertyId } = useMarkerRefsContext();

    const Card = orientation ? PropertyCardH : PropertyCard;

    const handleHover = useCallback(() => {
        if (item?.id === undefined) return;
        const m = getByPropertyId(item.id);
        if (!m) return;
        m.setIcon(ACTIVE);
        m.setZIndex(1000);
    }, []);

    const handleUnhover = useCallback(async () => {
        if (item?.id === undefined) return;

        await sleep(300);

        const m = getByPropertyId(item.id);
        if (!m) return;
        m.setIcon(NORMAL);
    }, []);

    return (
        <Grid mb={1} item xs={12} sm={orientation ? 12 : 6}>
            <Card
                item={item}
                onMouseEnter={handleHover}
                onMouseLeave={handleUnhover}
            />
        </Grid>
    );
};

// ---------------------------------------------------------------------------------

const getGridItem = (orientation: boolean) => (item: IPropertyResultResponse) =>
    <GridItem key={item.id} orientation={orientation} item={item} />;

// ---------------------------------------------------------------------------------

interface PropertiesListProps {
    isLoading: boolean;
    filtered: IPropertyResultResponse[];
}

const PropertiesList = ({ isLoading, filtered }: PropertiesListProps) => {
    const [orientation, toggleOrientation] = useResponsiveOrientation();

    return (
        <>
            <FlipOrientationButton
                orientation={orientation}
                toggleOrientation={toggleOrientation}
            />

            {!isLoading && filtered.length === 0 && <Placeholder />}

            <Grid container spacing={1}>
                {filtered.map(getGridItem(orientation))}
            </Grid>
        </>
    );
};

export default PropertiesList;
