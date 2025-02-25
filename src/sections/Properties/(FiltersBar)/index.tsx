// mui
import { PaperProps } from "@mui/material/Paper";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Stack, SvgIconTypeMap } from "@mui/material";
// redux
import { useSelector } from "react-redux";
import {
    selectAll,
    selectSorting,
    setSorting,
    sumOfChangedProperties,
} from "src/slices/filters";
// icons
import { Menu } from "@/assets/icons/menu";
import GridViewIcon from "@mui/icons-material/GridView";
import MapIcon from "@mui/icons-material/Map";
import { ViewModeButton } from "./styles";
import ChosenFilters from "./ChosenFilters";
// components
import FilterSection from "./FiltersSection";
import { optionType } from "./types";
import { FC, useCallback, useMemo } from "react";
import useDialog from "@/hooks/useDialog";
import FilterMoreButton from "@/sections/Filters/FilterMore/Button";
import FilterSortBy from "@/sections/Filters/SortBy";
import dynamic from "next/dynamic";
import FiltersBar from "@/components/Filters/FiltersBar";
import useSortingOptions from "./useSortingOptions";
import { useDispatch } from "react-redux";
import { useFilterPropertiesQuery } from "@/services/properties";
const FilterMore = dynamic(() => import("./FilterMore"));

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
    const changedPropertyFilters = useSelector(sumOfChangedProperties);

    const [isDialogOpen, openDialog, closeDialog] = useDialog();
    const filters = useSelector(selectAll);

    //See if can be done better so i do not call again the filterProperties
    const { data } = useFilterPropertiesQuery({
        filter: filters,
        page: 0,
        pageSize: 1, // filters only one property just to get the totalProperties from the data
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

    const dispatch = useDispatch();
    const options = useSortingOptions();
    const sorting = useSelector(selectSorting);
    const handleSortingChange = useCallback(
        (s: string) => dispatch(setSorting(s)),
        []
    );

    return (
        <FiltersBar
            bottomContent={
                changedPropertyFilters > 0 ? <ChosenFilters mt={1} /> : null
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
                        onSortingChange={handleSortingChange}
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
