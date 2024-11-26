// mui
import { PaperProps } from "@mui/material/Paper";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Stack, SvgIconTypeMap } from "@mui/material";
// redux
import { useSelector } from "react-redux";
import { sumOfChangedProperties } from "src/slices/filters";
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
const FilterMore = dynamic(() => import("./FilterMore"));
import FilterMoreButton from "@/components/Filters/FilterMore/Button";
import FilterSortBy from "@/components/Filters/SortBy";
import { getOptions } from "./constants";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";
import FiltersBar from "@/components/Filters/FiltersBar";

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

interface Props extends PaperProps {
    sorting: string;
    onSortingChange: (s: string) => void;

    optionView: optionType;
    setOptionView: (o: optionType) => void;

    belowLg: boolean;
}

const FilterBar: FC<Props> = ({
    sorting,
    onSortingChange,
    optionView,
    setOptionView,

    belowLg,
    ...props
}) => {
    const { t } = useTranslation();

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

    const [isDialogOpen, openDialog, closeDialog] = useDialog();

    const options = useMemo(() => getOptions(t), [t]);

    return (
        <>
            <FiltersBar
                bottomContent={
                    changedPropertyFilters > 0 ? <ChosenFilters mt={1} /> : null
                }
                filters={
                    <>
                        {belowLg ? null : <FilterSection />}

                        <FilterMoreButton
                            changedFiltersCount={changedPropertyFilters}
                            onClick={openDialog}
                        />
                    </>
                }
                controls={
                    <Stack direction="row" spacing={0.3} alignItems="center">
                        <FilterSortBy
                            options={options}
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
                }
                {...props}
            />

            {isDialogOpen ? <FilterMore onClose={closeDialog} /> : null}
        </>
    );
};

export default FilterBar;
