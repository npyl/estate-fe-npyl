// mui
import { PaperProps } from "@mui/material/Paper";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Stack, SvgIconTypeMap } from "@mui/material";
// icons
import { Menu } from "@/assets/icons/menu";
import GridViewIcon from "@mui/icons-material/GridView";
import MapIcon from "@mui/icons-material/Map";
import { ViewModeButton } from "./styles";
import ChosenFilters from "./ChosenFilters";
// components
import FilterSection from "./FiltersSection";
import { optionType } from "./types";
import { FC, useMemo } from "react";
import useDialog from "@/hooks/useDialog";
import FilterMoreButton from "@/sections/Filters/FilterMore/Button";
import FilterSortBy from "@/sections/Filters/SortBy";
import dynamic from "next/dynamic";
import FiltersBar from "@/components/Filters/FiltersBar";
import useSortingOptions from "./useSortingOptions";
import { useFilterPropertiesQuery } from "@/services/properties";
import {
    useAllFilters,
    useFiltersContext,
    useSorting,
    useSumOfChangedProperties,
} from "../FiltersContext";
const FilterMore = dynamic(() => import("./FilterMore"));

const PAGE_SIZE = 25;

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

const FilterMoreWrap = () => {
    const changedPropertyFilters = useSumOfChangedProperties();

    const [isDialogOpen, openDialog, closeDialog] = useDialog();
    const filter = useAllFilters();

    //See if can be done better so i do not call again the filterProperties
    const { data } = useFilterPropertiesQuery({
        filter,
        page: 0,
        pageSize: PAGE_SIZE, // filters only one property just to get the totalProperties from the data
        sortBy: "modifiedAt",
        direction: "DESC",
    });
    //See if can be done better so i do not call again the filterProperties

    const totalProperties = data?.totalElements ?? 0;

    return (
        <>
            <FilterMoreButton
                changedFiltersCount={changedPropertyFilters}
                onClick={openDialog}
            />

            {isDialogOpen ? (
                <FilterMore
                    onClose={closeDialog}
                    totalProperties={totalProperties}
                />
            ) : null}
        </>
    );
};

interface Props extends PaperProps {
    optionView: optionType;
    setOptionView: (o: optionType) => void;

    belowLg: boolean;
}

const FilterBar: FC<Props> = ({
    optionView,
    setOptionView,

    belowLg,
    ...props
}) => {
    const changedPropertyFilters = useSumOfChangedProperties();

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
        <FiltersBar
            bottomContent={
                changedPropertyFilters > 0 ? <ChosenFilters /> : null
            }
            filters={
                <>
                    {belowLg ? null : <FilterSection />}
                    <FilterMoreWrap />
                </>
            }
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

export default FilterBar;
