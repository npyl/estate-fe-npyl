import { Grid } from "@mui/material";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useWatch } from "react-hook-form";
import { ICustomerYup } from "@/sections/Customer/Form/types";
import getSLIDERS from "./getSliders";

const buyerName = "buyer";

interface SliderProps {
    index: number;
}

const Sliders: FC<SliderProps> = ({ index }) => {
    const { t } = useTranslation();

    const buyer = useWatch<ICustomerYup>({ name: buyerName });
    const stepValue = buyer ? 25000 : 100; // default to 100 if neither is true

    const SLIDERS = useMemo(
        () => getSLIDERS(t, index, stepValue),
        [t, index, stepValue]
    );

    return SLIDERS.map((s) => (
        <Grid key={s.id} xs={12} sm={6} item>
            {s.item}
        </Grid>
    ));
};

export default Sliders;
