import { Grid, SelectChangeEvent, Stack, Typography } from "@mui/material";
import { FC, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useFormContext, useWatch } from "react-hook-form";
import Select from "@/components/hook-form/Select";
import useDemandEnums from "../useDemandEnums";
import { filterName } from "../util";

//  function to remove underscores and convert to number so i can compare them in order to not get maxValue less than minValue
const cleanValue = (value: string | null): number | null => {
    if (!value) return null;
    return parseInt(value.replace(/^_/, ""), 10);
};

interface FloorSliderProps {
    index: number;
}

const FloorSlider: FC<FloorSliderProps> = ({ index }) => {
    const { t } = useTranslation();
    const { watch, setValue } = useFormContext();
    const { minFloors, maxFloors } = useDemandEnums();

    const minName = filterName("minFloor", index);
    const maxName = filterName("maxFloor", index);

    const minFloor = useWatch({ name: minName });
    const maxFloor = useWatch({ name: maxName });

    const handleChangeMin = useCallback(
        (event: SelectChangeEvent<string>) => {
            const min = event.target.value === "" ? null : event.target.value;
            const max = watch(maxName);

            const cleanMin = cleanValue(min);
            const cleanMax = cleanValue(max);

            if (cleanMin !== null && cleanMax !== null && cleanMin > cleanMax) {
                setValue(maxName, min); // Set maxFloor to minFloor value if min is greater
            }

            setValue(minName, min);
        },
        [maxName, minName, setValue, watch]
    );

    const handleChangeMax = useCallback(
        (event: SelectChangeEvent<string>) => {
            const max = event.target.value === "" ? null : event.target.value;
            const min = watch(minName);

            const cleanMax = cleanValue(max);
            const cleanMin = cleanValue(min);

            if (cleanMax !== null && cleanMin !== null && cleanMax < cleanMin) {
                setValue(minName, max); // Set minFloor to maxFloor value if max is less
            }

            setValue(maxName, max);
        },
        [maxName, minName, setValue, watch]
    );

    // Ensure the values are set to null when they are empty strings
    useEffect(() => {
        if (minFloor === "") {
            setValue(minName, null);
        }
        if (maxFloor === "") {
            setValue(maxName, null);
        }
    }, [minFloor, maxFloor, setValue, minName, maxName]);

    // Ensure maxFloor is updated if it is less than minFloor
    useEffect(() => {
        const cleanMinFloor = cleanValue(minFloor);
        const cleanMaxFloor = cleanValue(maxFloor);

        if (
            cleanMinFloor !== null &&
            cleanMaxFloor !== null &&
            cleanMinFloor > cleanMaxFloor
        ) {
            setValue(maxName, minFloor); // Adjust maxFloor to be equal to minFloor
        }
    }, [minFloor, maxFloor, setValue, maxName]);

    return (
        <>
            <Typography variant="h6">{t("Floors")}</Typography>
            <Stack mt={2} px={1}>
                <Grid container direction="row" spacing={1.5}>
                    <Grid item xs={6}>
                        <Select
                            isEnum
                            name={minName}
                            label={t("Min")}
                            options={minFloors}
                            onChange={handleChangeMin}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Select
                            isEnum
                            name={maxName}
                            label={t("Max")}
                            options={maxFloors}
                            onChange={handleChangeMax}
                        />
                    </Grid>
                </Grid>
            </Stack>
        </>
    );
};

export default FloorSlider;
