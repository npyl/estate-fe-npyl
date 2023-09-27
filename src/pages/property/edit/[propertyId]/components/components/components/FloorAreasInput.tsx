import { Grid } from "@mui/material";
import OnlyNumbersInput from "src/components/OnlyNumbers";

import { useSelector, useDispatch } from "react-redux";

import {
    selectGroundFloor,
    selectFirst,
    selectSecond,
    selectThird,
    selectFourth,
    selectFifth,
    setGroundFloor,
    setFirst,
    setSecond,
    setThird,
    setFourth,
    setFifth,
} from "src/slices/property";
import { useTranslation } from "react-i18next";

const FloorAreasInput = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const groundFloor = useSelector(selectGroundFloor);
    const first = useSelector(selectFirst);
    const second = useSelector(selectSecond);
    const third = useSelector(selectThird);
    const fourth = useSelector(selectFourth);
    const fifth = useSelector(selectFifth);

    return (
        <>
            <Grid container direction={"row"}>
                <Grid item xs={2}>
                    <OnlyNumbersInput
                        label={t("Ground Floor")}
                        value={groundFloor}
                        formatThousands
                        onChange={(value) => {
                            dispatch(setGroundFloor(value));
                        }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <OnlyNumbersInput
                        label={t("1st")}
                        value={first}
                        formatThousands
                        onChange={(value) => {
                            dispatch(setFirst(value));
                        }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <OnlyNumbersInput
                        label={t("2nd")}
                        value={second}
                        formatThousands
                        onChange={(value) => {
                            dispatch(setSecond(value));
                        }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <OnlyNumbersInput
                        label={t("3rd")}
                        value={third}
                        formatThousands
                        onChange={(value) => {
                            dispatch(setThird(value));
                        }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <OnlyNumbersInput
                        label={t("4th")}
                        value={fourth}
                        formatThousands
                        onChange={(value) => {
                            dispatch(setFourth(value));
                        }}
                    />
                </Grid>
                <Grid item xs={2}>
                    <OnlyNumbersInput
                        label={t("5th")}
                        value={fifth}
                        formatThousands
                        onChange={(value) => {
                            dispatch(setFifth(value));
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default FloorAreasInput;
