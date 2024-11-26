/**
 * This component is used to fill in the location field just the way google calendar api wants it
 */

import { useLoadApi } from "@/components/Map";
import PlacesAutocomplete from "@/components/Map/plugins/Search/PlacesAutocomplete";
import Popover from "@/components/Map/plugins/Search/Popover";
import { PlacesAutocompleteRef } from "@/components/Map/plugins/Search/types";
import { LocationSearching } from "@mui/icons-material";
import InputAdornment from "@mui/material/InputAdornment";
import { useCallback, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

const nameKey = "location";

const RHFLocation = () => {
    const { t } = useTranslation();
    const { setValue, control } = useFormContext();

    const inputRef = useRef<PlacesAutocompleteRef>(null);

    const { isLoaded } = useLoadApi();

    const handleSelect = useCallback(
        (o: google.maps.places.AutocompletePrediction) => {
            // The description typically contains the full address
            // We'll use the main_text and secondary_text from structured_formatting
            const mainText = o.structured_formatting.main_text;
            const secondaryText = o.structured_formatting.secondary_text;

            setValue(nameKey, `${mainText}, ${secondaryText}`, {
                shouldDirty: true,
            });

            // close popover
            inputRef.current?.clearSuggestions();
        },
        []
    );

    if (!isLoaded) return null;

    return (
        <Controller
            name={nameKey}
            control={control}
            render={({ field: { value, ...field } }) => (
                <PlacesAutocomplete
                    text={value}
                    onTextChange={field.onChange}
                    {...field}
                    ref={inputRef}
                    label={t("Location")}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LocationSearching />
                            </InputAdornment>
                        ),
                    }}
                    DataView={Popover}
                    onSelect={handleSelect}
                />
            )}
        />
    );
};

export default RHFLocation;
