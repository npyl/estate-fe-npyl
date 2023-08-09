import { MenuItem, Paper, Popper, Stack, TextField } from "@mui/material";
import { FC, useMemo, useRef, useState } from "react";

import usePlacesAutocomplete from "use-places-autocomplete";

interface SearchOnMapProps {
    onSearchSelect: (
        selection: google.maps.places.AutocompletePrediction
    ) => void;
}

const SearchOnMap: FC<SearchOnMapProps> = ({ onSearchSelect }) => {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();

    const textFieldRef = useRef(null);

    const [anchorEl, setAnchorEl] = useState(null);

    const open = useMemo(() => !!anchorEl, [anchorEl]);

    const handleClick = (o: google.maps.places.AutocompletePrediction) => {
        clearSuggestions();
        onSearchSelect(o);
    };

    return (
        <div>
            <TextField
                fullWidth
                ref={textFieldRef}
                disabled={!ready}
                variant="outlined"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    if (e.target.value.length > 3)
                        setAnchorEl(textFieldRef.current);
                }}
                placeholder="Search on map..."
                sx={{
                    ml: 3,
                    width: "50%",
                    position: "absolute",
                    top: 11,
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 1000,

                    backgroundColor: "white",
                    borderRadius: 1,
                    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)", // Optional: Add a subtle shadow for depth
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0, 0, 0, 0.23)", // Adjust border color if needed
                    },
                }}
            />

            <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
                <Paper>
                    <Stack direction={"column"}>
                        {data.map((o, index) => (
                            <MenuItem
                                key={index}
                                onClick={() => handleClick(o)}
                            >
                                {o.description}
                            </MenuItem>
                        ))}
                    </Stack>
                </Paper>
            </Popper>
        </div>
    );
};

export default SearchOnMap;
