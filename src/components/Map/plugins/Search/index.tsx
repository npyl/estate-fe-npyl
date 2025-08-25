import { useRef, FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { StyledAutocomplete } from "./styled";
import { PlacesAutocompleteRef } from "./types";
import { IMapAddress } from "@/components/Map/types";
import getAddressComponent from "@/components/Map/util/getAddressComponent";

const MAP_SEARCH_TESTID = "map-search-testid";

interface SearchProps {
    onSearchSelect?: (lat: number, lng: number, selected: IMapAddress) => void;
}

const Search: FC<SearchProps> = ({ onSearchSelect }) => {
    const textFieldRef = useRef<PlacesAutocompleteRef>(null);

    const { t } = useTranslation();

    const handleSelect = useCallback(
        async (o: google.maps.places.AutocompletePrediction) => {
            if (!onSearchSelect) return;
            try {
                textFieldRef.current?.clearSuggestions();

                const results = await getGeocode({
                    placeId: o.place_id,
                    language: "el",
                });
                if (results.length === 0) return null;
                const { address_components } = results[0];
                if (!address_components) return null;
                const latLng = getLatLng(results[0]);
                if (!latLng) return null;
                const street = getAddressComponent(address_components, "route");
                const number = getAddressComponent(
                    address_components,
                    "street_number"
                );
                const zipCode = getAddressComponent(
                    address_components,
                    "postal_code"
                ).replace(/\s/g, "");

                onSearchSelect?.(latLng.lat, latLng.lng, {
                    street,
                    number,
                    zipCode,
                });
            } catch (ex) {}
        },
        [onSearchSelect]
    );

    return (
        <StyledAutocomplete
            ref={textFieldRef}
            fullWidth
            variant="outlined"
            placeholder={t<string>("Search on map...")}
            InputProps={{
                startAdornment: <SearchIcon />,
            }}
            inputProps={{
                "data-testid": MAP_SEARCH_TESTID,
            }}
            onSelect={handleSelect}
        />
    );
};

export { MAP_SEARCH_TESTID };
export default Search;
