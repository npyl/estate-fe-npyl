import { Grid } from "@mui/material";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import DemandFormSlider from "./Slider";
import { useWatch } from "react-hook-form";
import { TranslationType } from "src/types/translation";
import { ICustomerYup } from "@/sections/Customer/Form/types";
import FloorSlider from "./FloorSlider";

// Function to generate the options for each field
const generateRange = (start: number, end: number, step: number = 1) => {
    const range = [];
    for (let i = start; i <= end; i += step) {
        range.push(i);
    }
    return range;
};

const priceOptions = generateRange(10000, 1000000, 10000);
const sizeOptions = generateRange(0, 300, 10);
const plotSizeOptions = generateRange(0, 500, 10);
const bedroomOptions = generateRange(0, 10, 1);
const bathroomOptions = generateRange(0, 10, 1);
const yearOptions = generateRange(1960, 2024);

const getSLIDERS = (t: TranslationType, index: number, stepValue: number) => [
    // eslint-disable-next-line react/jsx-key
    <DemandFormSlider
        label={t("Price")}
        min="minPrice"
        max="maxPrice"
        defaultMin={0}
        defaultMax={1000000}
        demandIndex={index}
        adornment="€"
        step={stepValue}
        options={priceOptions}
        isForPrice={true}
    />,
    // eslint-disable-next-line react/jsx-key
    <DemandFormSlider
        label={t("Size")}
        min="minCovered"
        max="maxCovered"
        defaultMin={0}
        defaultMax={300}
        demandIndex={index}
        adornment="m²"
        step={10}
        options={sizeOptions}
    />,
    // eslint-disable-next-line react/jsx-key
    <DemandFormSlider
        label={t("Size of Plot")}
        min="minPlot"
        max="maxPlot"
        defaultMin={0}
        defaultMax={500}
        demandIndex={index}
        adornment="m²"
        step={10}
        options={plotSizeOptions}
    />,
    // eslint-disable-next-line react/jsx-key
    <DemandFormSlider
        label={t("Bedrooms")}
        min="minBedrooms"
        max="maxBedrooms"
        defaultMin={0}
        defaultMax={10}
        demandIndex={index}
        step={1}
        options={bedroomOptions}
    />,
    // eslint-disable-next-line react/jsx-key
    <DemandFormSlider
        label={t("Bathrooms")}
        min="minBathrooms"
        max="maxBathrooms"
        defaultMin={0}
        defaultMax={10}
        demandIndex={index}
        step={1}
        options={bathroomOptions}
    />,
    // eslint-disable-next-line react/jsx-key
    <DemandFormSlider
        label={t("Year of Construction")}
        min="minYearOfConstruction"
        max="maxYearOfConstruction"
        defaultMin={1960}
        defaultMax={new Date().getFullYear()}
        demandIndex={index}
        options={yearOptions}
        isForYearOfConstruction={true}
    />,
    // eslint-disable-next-line react/jsx-key
    <FloorSlider index={index} />,
];

const leaserName = "leaser";
const buyerName = "buyer";

interface SliderProps {
    index: number;
}

const Sliders: FC<SliderProps> = ({ index }) => {
    const { t } = useTranslation();

    const leaser = useWatch<ICustomerYup>({ name: leaserName });
    const buyer = useWatch<ICustomerYup>({ name: buyerName });
    const stepValue = buyer ? 25000 : leaser ? 100 : 100; // default to 100 if neither is true

    const SLIDERS = useMemo(
        () => getSLIDERS(t, index, stepValue),
        [t, index, stepValue]
    );

    return (
        <>
            {SLIDERS.map((s, i) => (
                <Grid key={i} xs={12} sm={6} item>
                    {s}
                </Grid>
            ))}
        </>
    );
};

export default Sliders;
