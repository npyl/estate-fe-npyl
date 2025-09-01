/* eslint-disable react/jsx-key */

import DemandFormSlider from "./Slider";
import { TranslationType } from "@/types/translation";
import FloorSlider from "./FloorSlider";
import getIndexMapped from "@/utils/getIndexMapped";

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

const getSLIDERS = (t: TranslationType, index: number, stepValue: number) =>
    getIndexMapped([
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
        <DemandFormSlider
            label={t("Plot Size")}
            min="minPlot"
            max="maxPlot"
            defaultMin={0}
            defaultMax={500}
            demandIndex={index}
            adornment="m²"
            step={10}
            options={plotSizeOptions}
        />,
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
        <FloorSlider index={index} />,
    ]);

export default getSLIDERS;
