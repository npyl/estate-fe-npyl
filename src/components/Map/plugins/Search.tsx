import { useRef, ChangeEvent, FC, useState } from "react";
import { MenuItem, Paper, Popper, Stack, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import SearchIcon from "@mui/icons-material/Search";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import { IMapAddress } from "../Map";
import getAddressComponent from "../util/getAddressComponent";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)({
    position: "absolute",
    width: "30%",
    top: 9,
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "white",
    borderRadius: "20px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease-in-out",
    "& .MuiInputBase-input": {
        paddingLeft: 5,
    },
    "& .MuiOutlinedInput-root": {
        borderRadius: "20px",
        height: "45px",
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "rgba(0, 0, 0, 0.23)",
    },
    "&:focus-within": {
        width: "calc(100% - 9px)",
    },
});

interface SearchOnMapProps {
    onSearchSelect?: (selected: IMapAddress, lat: number, lng: number) => void;
}

const SearchOnMap: FC<SearchOnMapProps> = ({ onSearchSelect }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { data },
        clearSuggestions,
    } = usePlacesAutocomplete();
    const textFieldRef = useRef(null);
    const { t } = useTranslation();
    const [isFocused, setIsFocused] = useState(false);

    const handleClick = async (
        o: google.maps.places.AutocompletePrediction
    ) => {
        if (!onSearchSelect) return;
        try {
            clearSuggestions();
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
            onSearchSelect?.(
                { street, number, zipCode },
                latLng.lat,
                latLng.lng
            );
        } catch (ex) {}
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value);

    return (
        <>
            <StyledTextField
                fullWidth
                ref={textFieldRef}
                disabled={!ready}
                variant="outlined"
                value={value}
                onChange={handleChange}
                placeholder={t("Search on map...") || ""}
                InputProps={{
                    startAdornment: <SearchIcon />,
                }}
            />
            {value.length > 3 ? (
                <Popper
                    open
                    anchorEl={textFieldRef.current}
                    placement="bottom-start"
                >
                    <Paper>
                        <Stack direction={"column"}>
                            {data.map((o) => (
                                <MenuItem
                                    key={o.place_id}
                                    onClick={() => handleClick(o)}
                                >
                                    {o.description}
                                </MenuItem>
                            ))}
                        </Stack>
                    </Paper>
                </Popper>
            ) : null}
        </>
    );
};

export default SearchOnMap;
