import { Autocomplete, TextField } from "@mui/material";
import { useCallback, useState } from "react";
import {
    useAllPropertiesQuery,
    useLazyGetPropertyByCodeQuery,
} from "src/services/properties";
import { useTranslation } from "react-i18next";
import { IDemandFiltersPOST } from "src/types/demand";
import { IProperties } from "src/types/properties";
import { useFormContext } from "react-hook-form";

interface DemandAutocompleteProps {
    index: number;
}

const DemandAutocomplete = ({ index }: DemandAutocompleteProps) => {
    const { setValue } = useFormContext();
    const { t } = useTranslation();

    const [propertyCode, setPropertyCode] = useState<string>("");

    const [getPropertyByCode] = useLazyGetPropertyByCodeQuery();

    const propertyCodes: string[] =
        useAllPropertiesQuery(undefined, {
            selectFromResult: ({ data }) => ({
                data: data
                    ?.filter((property) => property.code !== null)
                    .map((property) => {
                        return property.code;
                    }),
            }),
        }).data || [];

    const fillFromPropertyForCode = useCallback(
        (p: IProperties) => {
            if (!p) return;

            const setFilter = (key: keyof IDemandFiltersPOST, value: any) =>
                setValue(`demands[${index}].filters.${key}`, value);

            setFilter("parentCategories", p.parentCategory.key);
            setFilter("categories", p.category.key);
            setFilter("furnished", p.technicalFeatures.furnished.key);
            setFilter("state", p.state.key);
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
        (_event: any, value: string | null) => {
            setPropertyCode(value || "");

            if (value)
                getPropertyByCode(value).unwrap().then(fillFromPropertyForCode);
        },
        [index]
    );

    return (
        <Autocomplete
            disablePortal
            value={propertyCode}
            onChange={autocompleteChange}
            options={propertyCodes}
            renderInput={(params) => (
                <TextField {...params} label={t("Property Code")} />
            )}
        />
    );
};

export default DemandAutocomplete;
