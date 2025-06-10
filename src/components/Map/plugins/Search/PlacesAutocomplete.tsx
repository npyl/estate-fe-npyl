import {
    useRef,
    ChangeEvent,
    forwardRef,
    ComponentType,
    useImperativeHandle,
    useCallback,
} from "react";
import { TextField, TextFieldProps } from "@mui/material";
import usePlacesAutocomplete from "use-places-autocomplete";
import { DataProps, PlacesAutocompleteRef } from "./types";

type DataViewComponent = ComponentType<DataProps>;

interface PlacesAutocompleteProps
    extends Omit<TextFieldProps, "onChange" | "value" | "onSelect"> {
    text?: string;
    onTextChange?: (s: string) => void;
    onSelect: (o: google.maps.places.AutocompletePrediction) => void;
    DataView?: DataViewComponent;
}

const PlacesAutocomplete = forwardRef<
    PlacesAutocompleteRef,
    PlacesAutocompleteProps
>(({ DataView, disabled, text, onTextChange, onSelect, ...props }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const {
        ready,
        setValue,
        suggestions: { data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    useImperativeHandle(
        ref,
        () => ({
            ...inputRef.current!,
            clearSuggestions,
        }),
        [inputRef.current]
    );

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            setValue(e.target.value);
            onTextChange?.(e.target.value);
        },
        [onTextChange]
    );

    return (
        <>
            <TextField
                ref={inputRef}
                disabled={!ready || disabled}
                {...props}
                value={text}
                onChange={handleChange}
            />

            {DataView && data.length > 0 && inputRef.current ? (
                <DataView
                    anchorEl={inputRef.current}
                    data={data}
                    onSelect={onSelect}
                    onClose={clearSuggestions}
                />
            ) : null}
        </>
    );
});

PlacesAutocomplete.displayName = "PlacesAutocomplete";

export default PlacesAutocomplete;
