import { FC } from "react";
// filters
import PropertyFilterBar, {
    PropertyFiltersBarProps,
} from "@/sections/Properties/(FiltersBar)";

import { OverridableComponent } from "@mui/material/OverridableComponent";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Stack, SvgIconTypeMap } from "@mui/material";
// icons
import { Menu } from "@/assets/icons/menu";
import GridViewIcon from "@mui/icons-material/GridView";
import MapIcon from "@mui/icons-material/Map";
// components
import { useMemo } from "react";
import FilterSortBy from "@/sections/Filters/SortBy";
import {
    useFiltersContext,
    useSorting,
} from "@/sections/Properties/FiltersContext";
import { optionType } from "@/sections/Properties/(FiltersBar)/types";
import useSortingOptions from "@/sections/Properties/(FiltersBar)/useSortingOptions";
import { ViewModeButton } from "@/sections/Properties/(FiltersBar)/styles";

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

const FiltersBar: FC<PropertyFiltersBarProps> = ({
    belowLg,
    optionView,
    setOptionView,
    ...props
}) => {
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

    const options = useSortingOptions();
    const sorting = useSorting();

    const { setSorting } = useFiltersContext();

    return (
        <PropertyFilterBar
            belowLg={belowLg}
            optionView={optionView}
            setOptionView={setOptionView}
            controls={
                <Stack direction="row" spacing={0.3} alignItems="center">
                    <FilterSortBy
                        options={options}
                        sorting={sorting}
                        onSortingChange={setSorting}
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
            }
            {...props}
        />
    );
};

export default FiltersBar;
