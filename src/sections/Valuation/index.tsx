import PropertyFiltersBar from "@/sections/Properties/(FiltersBar)";
import useResponsive from "@/hooks/useResponsive";
import { FC } from "react";
import MapIcon from "@mui/icons-material/Map";
import ViewModeButton, {
    ViewModeButtonProps,
} from "../Properties/(FiltersBar)/ViewModeButton";
import useToggle from "@/hooks/useToggle";
import MapSection from "@/sections/Properties/ViewAll/(MapView)/MapSection";
import Grid from "@mui/material/Unstable_Grid2";
import Stack from "@mui/material/Stack";
import Content from "./Content";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ResponsiveGrid, {
    TDrawerProps,
    TGridProps,
} from "@/components/ResponsiveGrid";
import ContentGridItem from "./ContentGridItem";

const MapToggle: FC<ViewModeButtonProps> = (props) => (
    <ViewModeButton {...props}>
        <MapIcon />
    </ViewModeButton>
);

const setOptionView = () => {};

const GridProps: TGridProps = {
    height: `calc(100vh - 136px)`,
    xs: 12,
    lg: 6,
    order: {
        xs: 1,
        lg: 2,
    },
    position: {
        xs: "inherit",
        lg: "sticky",
    },
    top: "120px",
    right: "0px",
};

const DrawerProps: TDrawerProps = {
    anchor: "right",
    PaperProps: {
        sx: {
            width: 0.9,
            height: 1,
            zIndex: 100,
        },
    },
};

const Valuation = () => {
    const belowLg = useResponsive("down", "lg");
    const [isOpen, toggleMap] = useToggle(true);

    return (
        <Stack spacing={1}>
            <PropertyFiltersBar
                belowLg={belowLg}
                optionView="map"
                setOptionView={setOptionView}
                controls={<MapToggle selected={isOpen} onClick={toggleMap} />}
            />

            <Grid container spacing={1}>
                <ContentGridItem isMapOpen={isOpen}>
                    <Content />
                </ContentGridItem>

                {isOpen ? (
                    <ResponsiveGrid
                        gridProps={GridProps}
                        drawerProps={DrawerProps}
                    >
                        <Box display={{ xs: "block", lg: "none" }}>
                            <IconButton onClick={toggleMap}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                        <MapSection />
                    </ResponsiveGrid>
                ) : null}
            </Grid>
        </Stack>
    );
};

export default Valuation;
