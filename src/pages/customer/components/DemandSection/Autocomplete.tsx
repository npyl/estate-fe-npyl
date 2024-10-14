import { TextField } from "@mui/material";
import { useCallback, useState } from "react";
import { useLazyGetPropertyByCodeQuery } from "src/services/properties";
import { useTranslation } from "react-i18next";
import { IDemandFiltersPOST } from "src/types/demand";
import { IProperties } from "src/types/properties";
import { useFormContext } from "react-hook-form";
import CodeSelect from "@/sections/CodeSelect";

interface DemandAutocompleteProps {
    index: number;
}

const DemandAutocomplete = ({ index }: DemandAutocompleteProps) => {
    const { setValue } = useFormContext();
    const { t } = useTranslation();

    const [getPropertyByCode] = useLazyGetPropertyByCodeQuery();

    const fillFromPropertyForCode = useCallback(
        (p: IProperties) => {
            if (!p) return;

            const setFilter = (key: keyof IDemandFiltersPOST, value: any) =>
                setValue(`demands[${index}].filters.${key}`, value);

            setFilter("parentCategories", [p.parentCategory.key]);
            setFilter("categories", [p.category.key]);
            setFilter("furnished", [p.technicalFeatures.furnished.key]);
            setFilter("states", [p.state.key]);
            setFilter("minBedrooms", p.details.bedrooms);
            setFilter("minBathrooms", p.details.bathrooms);
            setFilter("minCovered", p.technicalFeatures.coverageFactor);
            setFilter("minPlot", p.plotArea);
            setFilter("minPrice", p.price);
            setFilter("minFloor", p.details.floor.key);
            setFilter(
                "minYearOfConstruction",
                p.construction.yearOfConstruction
            );
            setFilter(
                "labels",
                p.labels.map((label) => label.id)
            );
        },
        [index]
    );

    const autocompleteChange = useCallback(
        (_: any, value: string | null) => {
            if (!value) return;
            getPropertyByCode(value).unwrap().then(fillFromPropertyForCode);
        },
        [index]
    );

    return (
        <CodeSelect
            onChange={autocompleteChange}
            renderInput={(params) => (
                <TextField {...params} label={t("Property Code")} />
            )}
        />
    );
};

export default DemandAutocomplete;
