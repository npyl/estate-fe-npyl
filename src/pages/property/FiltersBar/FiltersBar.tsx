// mui
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Box, SvgIconTypeMap } from "@mui/material";
// redux
import { useSelector } from "react-redux";
import { sumOfChangedProperties } from "src/slices/filters";
// icons
import { Menu } from "src/icons/menu";
import GridViewIcon from "@mui/icons-material/GridView";
import MapIcon from "@mui/icons-material/Map";
import { ViewModeButton } from "./styles";
import ChosenFilters from "./Filters/ChosenFilters";
import { SpaceBetween } from "@/components/styled";
// components
import FilterSortBy from "./SortBy";
import FilterSection from "./FiltersSection";
import { optionType } from "./types";
import { useMemo } from "react";

type viewOptionsType = {
    id: optionType;
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
    label: string;
};

const viewOptions: viewOptionsType[] = [
    {
        id: "list",
        icon: Menu,
        label: "List",
    },
    {
        id: "grid",
        icon: GridViewIcon,
        label: "Grid",
    },
    {
        id: "map",
        icon: MapIcon,
        label: "Map",
    },
];

interface Props {
    sorting: string;
    onSortingChange: (s: string) => void;

    optionView: optionType;
    setOptionView: (o: optionType) => void;

    belowLg: boolean;
}

const FilterBar = ({
    sorting,
    onSortingChange,
    optionView,
    setOptionView,

    belowLg,
}: Props) => {
    const changedPropertyFilters = useSelector(sumOfChangedProperties);

    const BUTTONS = useMemo(() => {
        const filtered = belowLg
            ? viewOptions.filter(({ id }) => id !== "list")
            : viewOptions;

        return filtered.map((option) => (
            <ViewModeButton
                key={option.id}
                selected={optionView === option.id}
                onClick={() => setOptionView(option.id)}
            >
                <option.icon />
            </ViewModeButton>
        ));
    }, [optionView, belowLg]);

    return (
        <Paper
            sx={{
                p: 1,
            }}
        >
            <SpaceBetween>
                <Box
                    sx={{
                        overflowX: "auto",
                        overflowY: "hidden",
                    }}
                >
                    <FilterSection />
                </Box>

                <Stack direction="row" spacing={0.3}>
                    <FilterSortBy
                        sorting={sorting}
                        onSortingChange={onSortingChange}
                    />

                    <ButtonGroup
                        size="small"
                        sx={{
                            gap: 0.3,
                        }}
                    >
                        {BUTTONS}
                    </ButtonGroup>
                </Stack>
            </SpaceBetween>

            {changedPropertyFilters > 0 ? <ChosenFilters /> : null}
        </Paper>
    );
};

export default FilterBar;
