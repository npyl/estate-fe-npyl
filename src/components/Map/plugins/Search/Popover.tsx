import { FC } from "react";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Popper from "@mui/material/Popper";
import { DataProps } from "./types";
import { Paper } from "@mui/material";

const Popover: FC<DataProps> = ({ data, anchorEl, onSelect }) => (
    <Popper open disablePortal anchorEl={anchorEl} placement="bottom-start">
        <Paper>
            <Stack direction="column">
                {data.map((o) => (
                    <MenuItem key={o.place_id} onClick={() => onSelect(o)}>
                        {o.description}
                    </MenuItem>
                ))}
            </Stack>
        </Paper>
    </Popper>
);

export default Popover;
