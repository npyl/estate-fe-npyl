import {
    ListItemText,
    MenuItem,
    Select,
    Slider,
    Stack,
    Typography,
} from "@mui/material";

import { useSelector } from "react-redux";
import { useDispatch } from "src/store";

import {
    // reset
    resetBasic,
    resetBedrooms,
    resetConstructionYear,
    resetFloor,
    resetFrameType,
    resetFurnished,
    resetHeatingType,
    selectFrameType,
    selectFurnished,
    selectHeatingType,
    selectLabels,
    selectMaxBedrooms,
    selectMaxConstructionYear,
    selectMaxFloor,
    selectMinBedrooms,
    selectMinConstructionYear,
    selectMinFloor,
    setLabels,
    setMaxBedrooms,
    setMaxConstructionYear,
    setMaxFloor,
    setMinBedrooms,
    setMinConstructionYear,
    setMinFloor,
    sumOfChangedProperties,
    // setters
    toggleFrameType,
    toggleFurnished,
    toggleHeatingType,
} from "src/slices/filters";

import ChosenFilters from "./ChosenFilters";
import SubCategorySelect from "./Category";
import CodeSelect from "./Code";
import FilterLabels from "./Labels";
import ManagerSelect from "./Manager";
import CategorySelect from "./ParentCategory";
import PriceSelect from "./Price";
import SaleSelect from "./Sale";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useGlobals } from "src/hooks/useGlobals";
import { KeyValue } from "src/types/KeyValue";
import { TranslationType } from "src/types/translation";

import FieldSelect from "@/components/Filters/FieldSelect";
import { ClearableDialogContent } from "@/components/Filters/ClearableDialogContent";
import { FilterMoreDialog } from "@/components/Filters/FilterMore";

// ----------------------------------------------------------------------

type Props = {
    open: boolean;
    onOpen: VoidFunction;
    onClose: VoidFunction;
    onResetFilter: VoidFunction;
};

const useEnums = () => {
    const enums = useGlobals();

    const details = useMemo(() => enums?.property?.details, [enums]);

    return {
        frameTypeEnum: details?.frameType || [],
        furnishedEnum: details?.furnished || [],
        heatingTypeEnum: details?.heatingType || [],
        minFloorEnum: details?.floors || [],
        maxFloorEnum: details?.floors || [],
    };
};

const getFEILDS = (
    t: TranslationType,
    frameType: string[],
    furnished: string[],
    heatingType: string[],
    frameTypeEnum: KeyValue[],
    furnishedEnum: KeyValue[],
    heatingTypeEnum: KeyValue[]
) => [
    {
        id: "frameType",
        values: frameType,
        title: t("Frame Type"),
        options: frameTypeEnum,
        onClick: toggleFrameType,
        onReset: resetFrameType,
    },
    {
        id: "Furnished",
        values: furnished,
        title: t("Furnished"),
        options: furnishedEnum,
        onClick: toggleFurnished,
        onReset: resetFurnished,
    },
    {
        id: "heatingType",
        title: t("Heating Type"),
        values: heatingType,
        options: heatingTypeEnum,
        onClick: toggleHeatingType,
        onReset: resetHeatingType,
    },
];

export default function FilterMore({ open, onClose, onResetFilter }: Props) {
    const { t } = useTranslation();
    const {
        frameTypeEnum,
        furnishedEnum,
        heatingTypeEnum,
        minFloorEnum,
        maxFloorEnum,
    } = useEnums();

    const dispatch = useDispatch();

    const changedPropsCount = useSelector(sumOfChangedProperties);

    const frameType = useSelector(selectFrameType);
    const furnished = useSelector(selectFurnished);
    const heatingType = useSelector(selectHeatingType);

    const minYear = useSelector(selectMinConstructionYear) || 0;
    const maxYear = useSelector(selectMaxConstructionYear) || 0;
    const minBedrooms = useSelector(selectMinBedrooms) || 0;
    const maxBedrooms = useSelector(selectMaxBedrooms) || 0;
    const minFloors = useSelector(selectMinFloor) || 0;
    const maxFloors = useSelector(selectMaxFloor) || 0;
    const labels = useSelector(selectLabels) || [];

    const fields = useMemo(
        () =>
            getFEILDS(
                t,
                // values
                frameType,
                furnished,
                heatingType,
                // enums
                frameTypeEnum,
                furnishedEnum,
                heatingTypeEnum
            ),
        [
            t,
            // values
            frameType,
            furnished,
            heatingType,
            // enums
            frameTypeEnum,
            furnishedEnum,
            heatingTypeEnum,
        ]
    );

    return (
        <FilterMoreDialog
            open={open}
            onClose={onClose}
            changedFiltersCount={changedPropsCount}
            onResetFilter={{} as any}
        >
            {changedPropsCount > 0 ? <ChosenFilters /> : null}

            <ClearableDialogContent dividers reset={resetBasic}>
                <Typography>{t("Basic")}</Typography>

                <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
                    <CodeSelect />
                    <ManagerSelect />

                    <SaleSelect />

                    <CategorySelect />
                    <SubCategorySelect />

                    <PriceSelect type={t("price")} />
                    <PriceSelect type={t("area")} />

                    <FilterLabels
                        variant="property"
                        labels={labels}
                        setLabels={setLabels}
                    />
                </Stack>
            </ClearableDialogContent>
            <ClearableDialogContent dividers reset={resetBedrooms}>
                <Typography>{t("Bedrooms")}</Typography>
                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    spacing={1}
                    alignItems="center"
                >
                    <Select
                        sx={{ width: 130 }}
                        value={minBedrooms}
                        onChange={(e) =>
                            dispatch(
                                setMinBedrooms(
                                    e.target.value === 0
                                        ? undefined
                                        : e.target.value
                                )
                            )
                        }
                    >
                        <MenuItem value={0}>
                            <ListItemText primary={t("Indifferent")} />
                        </MenuItem>
                        {generateNumbers().map((option) => (
                            <MenuItem
                                key={option}
                                value={option}
                                onClick={() =>
                                    option > maxBedrooms &&
                                    maxBedrooms !== 0 &&
                                    dispatch(setMaxBedrooms(0))
                                }
                            >
                                <ListItemText primary={option.toString()} />
                            </MenuItem>
                        ))}
                    </Select>
                    <Select
                        sx={{ width: 130 }}
                        value={maxBedrooms}
                        onChange={(e) =>
                            dispatch(
                                setMaxBedrooms(
                                    e.target.value === 0
                                        ? undefined
                                        : e.target.value
                                )
                            )
                        }
                    >
                        <MenuItem value={0}>
                            <ListItemText primary={t("Indifferent")} />
                        </MenuItem>
                        {generateNumbers().map((option) => (
                            <MenuItem
                                key={option}
                                value={option}
                                onClick={() =>
                                    option < minBedrooms &&
                                    dispatch(setMinBedrooms(0))
                                }
                            >
                                <ListItemText primary={option.toString()} />
                            </MenuItem>
                        ))}
                    </Select>
                </Stack>
            </ClearableDialogContent>
            <ClearableDialogContent dividers reset={resetFloor}>
                <Typography>{t("Floors")}</Typography>
                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    spacing={1}
                    alignItems={"center"}
                >
                    <Select
                        sx={{ width: 130 }}
                        value={minFloors}
                        onChange={(e) =>
                            dispatch(
                                setMinFloor(
                                    e.target.value === 0
                                        ? undefined
                                        : e.target.value
                                )
                            )
                        }
                    >
                        {minFloorEnum.map(
                            ({ key, value }, minFloorsSelectIndex) => (
                                <MenuItem
                                    key={minFloorsSelectIndex}
                                    value={key}
                                >
                                    {value}
                                </MenuItem>
                            )
                        )}
                    </Select>
                    <Select
                        sx={{ width: 130 }}
                        value={maxFloors}
                        onChange={(e) =>
                            dispatch(
                                setMaxFloor(
                                    e.target.value === 0
                                        ? undefined
                                        : e.target.value
                                )
                            )
                        }
                    >
                        {maxFloorEnum.map(
                            ({ key, value }, minFloorsSelectIndex) => (
                                <MenuItem
                                    key={minFloorsSelectIndex}
                                    value={key}
                                >
                                    {value}
                                </MenuItem>
                            )
                        )}
                    </Select>
                </Stack>
            </ClearableDialogContent>
            {fields.map(({ id, ...field }) => (
                <FieldSelect {...field} key={id} />
            ))}
            <ClearableDialogContent dividers reset={resetConstructionYear}>
                <Typography>{t("Construction Year")}</Typography>
                <Slider
                    value={[minYear, maxYear]}
                    onChange={(_event, newValue) => {
                        if (Array.isArray(newValue)) {
                            dispatch(setMinConstructionYear(newValue[0]));
                            dispatch(setMaxConstructionYear(newValue[1]));
                        }
                    }}
                    min={1960}
                    max={new Date().getFullYear()}
                    marks={[
                        { value: 1960, label: "1960" },
                        {
                            value: new Date().getFullYear(),
                            label: new Date().getFullYear().toString(),
                        },
                    ]}
                    valueLabelDisplay="auto"
                />
            </ClearableDialogContent>
        </FilterMoreDialog>
    );
}

function generateNumbers() {
    const numbers = [];

    for (let i = 1; i <= 10; i += 1) {
        numbers.push(i);
    }

    return numbers;
}
