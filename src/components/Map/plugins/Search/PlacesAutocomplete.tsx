import {
    useRef,
    ChangeEvent,
    forwardRef,
    ComponentType,
    useImperativeHandle,
    useCallback,
    useState,
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
    const [text, setText] = useState("");

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

    const handleSelect = useCallback(
        (o: google.maps.places.AutocompletePrediction) => {
            const mainText = o.structured_formatting.main_text;
            const secondaryText = o.structured_formatting.secondary_text;
            setText(`${mainText} ${secondaryText}`);

            onSelect(o);
        },
        [onSelect]
    );

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        setText(e.target.value);
    }, []);

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
                    onSelect={handleSelect}
                />
            ) : null}
        </>
    );
});

export default PlacesAutocomplete;
