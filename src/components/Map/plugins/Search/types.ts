import { ClearSuggestions } from "use-places-autocomplete";

interface DataProps {
    data: google.maps.places.AutocompletePrediction[];
    anchorEl: HTMLElement;
    onClose: VoidFunction;
    onSelect: (o: google.maps.places.AutocompletePrediction) => void;
}

interface PlacesAutocompleteRef extends HTMLInputElement {
    clearSuggestions: ClearSuggestions;
}

export type { DataProps, PlacesAutocompleteRef };
