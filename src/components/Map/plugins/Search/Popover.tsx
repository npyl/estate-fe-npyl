import { FC } from "react";
import MenuItem from "@mui/material/MenuItem";
import MuiPopover from "@mui/material/Popover";
import { DataProps } from "./types";

const getItem =
    (onSelect: (o: google.maps.places.AutocompletePrediction) => void) =>
    (o: google.maps.places.AutocompletePrediction) => (
        <MenuItem key={o.place_id} onClick={() => onSelect(o)}>
            {o.description}
        </MenuItem>
    );

const Popover: FC<DataProps> = ({ data, anchorEl, onSelect, onClose }) => (
    <MuiPopover
        open
        disableAutoFocus
        disableEnforceFocus
        disableRestoreFocus
        disablePortal
        anchorEl={anchorEl}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "center",
        }}
        onClose={onClose}
    >
        {data.map(getItem(onSelect))}
    </MuiPopover>
);

export default Popover;
