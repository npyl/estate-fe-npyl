// mui
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import ButtonGroup from "@mui/material/ButtonGroup";
import { SvgIconTypeMap } from "@mui/material";
// redux
import { useDispatch, useSelector } from "react-redux";
import { sumOfChangedProperties, resetState } from "src/slices/filters";
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
import { useCallback, useMemo } from "react";

import useDialog from "@/hooks/useDialog";
import FilterMore from "./Filters/FilterMore";
import { FilterMoreButton } from "@/components/Filters/FilterMore";

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
    const dispatch = useDispatch();

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

    const handleResetFilter = useCallback(() => dispatch(resetState()), []);

    const [isDialogOpen, openDialog, closeDialog] = useDialog();

    return (
        <>
            <Paper>
                <SpaceBetween pb={1} pl={1}>
                    <Stack
                        direction="row"
                        spacing={0.3}
                        overflow="auto hidden"
                        // INFO: paddings added in this container to allow badge to show up without overflow hacks
                        pt={1}
                        pb={0}
                    >
                        {belowLg ? null : <FilterSection />}

                        <FilterMoreButton
                            onClick={openDialog}
                            changedFiltersCount={changedPropertyFilters}
                        />
                    </Stack>

                    <Stack direction="row" spacing={0.3} p={1} pb={0} pl={0.3}>
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

                {changedPropertyFilters > 0 ? (
                    <ChosenFilters px={1} pb={1} />
                ) : null}
            </Paper>

            {isDialogOpen ? (
                <FilterMore
                    open={isDialogOpen}
                    onOpen={openDialog}
                    onClose={closeDialog}
                    onResetFilter={handleResetFilter}
                />
            ) : null}
        </>
    );
};

export default FilterBar;
