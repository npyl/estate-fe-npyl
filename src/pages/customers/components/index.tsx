import { Box, Paper, PaperProps, Stack } from "@mui/material";
import { useSelector } from "src/store";

import {
    selectLabels,
    setLabels,
    sumOfChangedProperties,
} from "src/slices/customer/filters";

import FilterStatus from "./Filters/FilterStatus";
import FilterBuyerLeaserAndMore from "./Filters/FilterBuyerLeaserAndMore";
import FilterCategory from "./Filters/FilterCategory";
import FilterParentCategory from "./Filters/FilterParentCategory";
import FilterLabels from "@/pages/components/Filters/Labels";
import ChosenFilters from "./Filters/ChosenFilters";
import PriceSelect from "./Filters/FilterPrice";
import FilterManager from "./Filters/FilterManagedBy";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import React from "react";

export const FilterSection: React.FC<PaperProps> = ({ ...props }) => {
    const changedCustomerFilters = useSelector(sumOfChangedProperties);
    const labels = useSelector(selectLabels) || [];

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const filterContent = (
        <Stack spacing={1} component={Paper} p={1} mt={1} {...props}>
            <Stack flexWrap={"wrap"} direction={"row"} gap={1}>
                <FilterBuyerLeaserAndMore />
                <FilterParentCategory />
                <FilterCategory />
                <FilterLabels
                    variant="customer"
                    labels={labels}
                    setLabels={setLabels}
                />
                <PriceSelect type={"price"}></PriceSelect>
                <PriceSelect type={"area"}></PriceSelect>
                <FilterManager />
                <FilterStatus />
            </Stack>
            {changedCustomerFilters > 0 && (
                <Box overflow={"auto"}>
                    <ChosenFilters />
                </Box>
            )}
        </Stack>
    );
    return isMobile ? (
        <>
            <IconButton
                size="small"
                aria-controls="menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <TuneOutlinedIcon />
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
            >
                {filterContent}
            </Popover>
        </>
    ) : (
        filterContent
    );
};
