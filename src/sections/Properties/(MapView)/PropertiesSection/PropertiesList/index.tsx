import { Grid } from "@mui/material";
import PropertyCard, { PropertyCardH } from "@/components/Cards/PropertyCard";
import { IPropertyResultResponse } from "@/types/properties";
import Placeholder from "./Placeholder";
import useResponsiveOrientation from "./hook";
import FlipOrientationButton from "./FlipOrientationButton";

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
                {filtered.map((item) => (
                    <Grid
                        mb={1}
                        key={item.id}
                        item
                        xs={12}
                        sm={orientation ? 12 : 6}
                    >
                        {orientation ? (
                            <PropertyCardH item={item} />
                        ) : (
                            <PropertyCard item={item} />
                        )}
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default PropertiesList;
