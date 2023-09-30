import {
    Button,
    Chip,
    Dialog,
    DialogActions,
    DialogTitle,
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
    selectFrameType,
    selectFurnished,
    selectHeatingType,
    selectMaxBedrooms,
    selectMaxConstructionYear,
    selectMaxFloor,
    selectMinBedrooms,
    selectMinConstructionYear,
    selectMinFloor,
    selectLabels,
    sumOfChangedProperties,
    // setters
    toggleFrameType,
    toggleFurnished,
    toggleHeatingType,
    setMaxBedrooms,
    setMaxConstructionYear,
    setMaxFloor,
    setMinBedrooms,
    setMinConstructionYear,
    setMinFloor,
    setLabels,
    // reset
    resetBasic,
    resetBedrooms,
    resetFloor,
    resetFrameType,
    resetHeatingType,
    resetFurnished,
    resetConstructionYear,
} from "src/slices/filters";

import ChosenFilters from "./ChosenFilters";
import SaleSelect from "./FilterSale";
import CategorySelect from "./FilterParentCategory";
import SubCategorySelect from "./FilterCategory";
import PriceSelect from "./FilterPrice";
import FilterLabels from "./FilterLabels";
import CodeSelect from "./FilterCode";
import ManagerIdSelect from "./FilterManagerId";

import { ClearableDialogContent } from "./components/ClearableDialogContent";
import { StyledDialogContent } from "./styles";
import { useTranslation } from "react-i18next";
import { useGlobals } from "src/hooks/useGlobals";

// ----------------------------------------------------------------------

type Props = {
    open: boolean;
    onOpen: VoidFunction;
    onApply: VoidFunction;
    onClose: VoidFunction;
    onResetFilter: VoidFunction;
};

export default function FilterMore({
    open,
    onApply,
    onClose,
    onResetFilter,
}: Props) {
    const dispatch = useDispatch();
    const data = useGlobals();
    const { t } = useTranslation();

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

    const fields = [
        {
            id: "frameType",
            values: frameType,
            title: t("Frame Type"),
            options: data?.property.details.frameType,
            onClick: toggleFrameType,
            onReset: resetFrameType,
        },
        {
            id: "Furnished",
            values: furnished,
            title: t("Furnished"),
            options: data?.property.details.furnished,
            onClick: toggleFurnished,
            onReset: resetFurnished,
        },
        {
            id: "heatingType",
            title: t("Heating Type"),
            values: heatingType,
            options: data?.property.details.heatingType,
            onClick: toggleHeatingType,
            onReset: resetHeatingType,
        },
    ];

    return (
        <Dialog maxWidth="md" open={open} onClose={onClose} scroll={"body"}>
            <DialogTitle>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Chip label={changedPropsCount} color={"error"} />
                    <Typography variant="subtitle1">{t("Filters")}</Typography>
                </Stack>
            </DialogTitle>
            {changedPropsCount > 0 && (
                <StyledDialogContent>
                    <ChosenFilters />
                </StyledDialogContent>
            )}

            <ClearableDialogContent dividers reset={resetBasic}>
                <Typography>{t("Basic")}</Typography>

                <Stack direction={"row"} gap={1} flexWrap={"wrap"}>
                    <CodeSelect />
                    <ManagerIdSelect />

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
            <ClearableDialogContent
                sx={{ maxHeight: "none", overflow: "visible" }}
                dividers
                reset={resetBedrooms}
            >
                <Typography>{t("Bedrooms")}</Typography>
                <Stack direction="row" spacing={1} alignItems={"center"}>
                    <Typography>{t("from")}</Typography>
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
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 210,
                                    overflowY: "scroll",
                                },
                            },
                        }}
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
                    <Typography>- {t("to")}</Typography>
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
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 210,
                                    overflowY: "scroll",
                                },
                            },
                        }}
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
                <Stack direction="row" spacing={1} alignItems={"center"}>
                    <Typography>{t("from")}</Typography>
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
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 210,
                                    overflowY: "scroll",
                                },
                            },
                        }}
                    >
                        <MenuItem value={0}>
                            <ListItemText primary={t("Indifferent")} />
                        </MenuItem>
                        {generateNumbers().map((option) => (
                            <MenuItem
                                key={option}
                                value={option}
                                onClick={() =>
                                    option > +maxFloors &&
                                    maxFloors !== 0 &&
                                    dispatch(setMaxFloor(0))
                                }
                            >
                                <ListItemText primary={option.toString()} />
                            </MenuItem>
                        ))}
                    </Select>
                    <Typography>- {t("to")}</Typography>
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
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 210,
                                    overflowY: "scroll",
                                },
                            },
                        }}
                    >
                        <MenuItem value={0}>
                            <ListItemText primary={t("Indifferent")} />
                        </MenuItem>
                        {generateNumbers().map((option) => (
                            <MenuItem
                                key={option}
                                value={option}
                                onClick={() =>
                                    option < +minFloors &&
                                    dispatch(setMinFloor(0))
                                }
                            >
                                <ListItemText primary={option.toString()} />
                            </MenuItem>
                        ))}
                    </Select>
                </Stack>
            </ClearableDialogContent>
            {fields.map((field) => (
                <ClearableDialogContent
                    key={field.id}
                    dividers
                    reset={field.onReset}
                >
                    <Typography>{field.title}</Typography>
                    <Stack direction={"row"} spacing={1}>
                        {field.options &&
                            field.options.map((e) => (
                                <Button
                                    variant={
                                        field.values.includes(e.key)
                                            ? "contained"
                                            : "outlined"
                                    }
                                    color={"primary"}
                                    key={e.key}
                                    onClick={() =>
                                        dispatch(field.onClick(e.key))
                                    }
                                >
                                    {e.value}
                                </Button>
                            ))}
                    </Stack>
                </ClearableDialogContent>
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
                        console.log(newValue);
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
                    aria-labelledby="year-slider"
                />
            </ClearableDialogContent>
            <DialogActions sx={{ justifyContent: "space-between" }}>
                <Button color={"secondary"} onClick={onResetFilter}>
                    {t("Clear all")}
                </Button>

                <Button
                    color={"secondary"}
                    variant="outlined"
                    onClick={() => {
                        onApply();
                        onClose();
                    }}
                >
                    {t("Apply")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

function generateNumbers() {
    const numbers = [];

    for (let i = 1; i <= 10; i += 1) {
        numbers.push(i);
    }

    return numbers;
}
