import {
    useRef,
    ChangeEvent,
    forwardRef,
    ComponentType,
    useImperativeHandle,
} from "react";
import { TextField, TextFieldProps } from "@mui/material";
import usePlacesAutocomplete from "use-places-autocomplete";
import { DataProps, PlacesAutocompleteRef } from "./types";

type DataViewComponent = ComponentType<DataProps>;

interface PlacesAutocompleteProps
    extends Omit<TextFieldProps, "onChange" | "value" | "onSelect"> {
    onSelect: (o: google.maps.places.AutocompletePrediction) => void;
    DataView?: DataViewComponent;
}

const PlacesAutocomplete = forwardRef<
    PlacesAutocompleteRef,
    PlacesAutocompleteProps
>(({ DataView, disabled, onSelect, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const {
        ready,
        value,
        setValue,
        suggestions: { data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    useImperativeHandle(ref, () => ({
        ...inputRef.current!,
        clearSuggestions,
    }));

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value);

    const isDataVisible =
        DataView && inputRef.current && value.length > 3 && data.length > 0;

    return (
        <>
            <TextField
                ref={inputRef}
                disabled={!ready || disabled}
                {...props}
                value={value}
                onChange={handleChange}
            />

            {isDataVisible ? (
                <DataView
                    anchorEl={inputRef.current}
                    data={data}
                    onSelect={onSelect}
                />
            ) : null}
        </>
    );
});

export default PlacesAutocomplete;
