import {
    useRef,
    ChangeEvent,
    forwardRef,
    useImperativeHandle,
    useCallback,
} from "react";
import { TextField, TextFieldProps } from "@mui/material";
import usePlacesAutocomplete from "use-places-autocomplete";
import { PlacesAutocompleteRef } from "./types";
import dynamic from "next/dynamic";
const Popover = dynamic(() => import("./Popover"));

interface PlacesAutocompleteProps
    extends Omit<TextFieldProps, "onChange" | "value" | "onSelect"> {
    text?: string;
    onTextChange?: (s: string) => void;
    onSelect: (o: google.maps.places.AutocompletePrediction) => void;
}

const PlacesAutocomplete = forwardRef<
    PlacesAutocompleteRef,
    PlacesAutocompleteProps
>(({ disabled, text, onTextChange, onSelect, ...props }, ref) => {
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
                value={text}
                onChange={handleChange}
                {...props}
            />

            {DataView && data.length > 0 && inputRef.current ? (
                <Popover
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
