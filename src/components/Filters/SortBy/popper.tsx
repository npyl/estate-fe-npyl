import { Paper, Popper } from "@mui/material";
import { ListItem } from "@/components/Filters";
import { TSortByOptions } from "./types";
import Iconify from "@/components/iconify";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

interface SelectPopperProps {
    anchorEl?: HTMLElement;
    options: TSortByOptions;
    sorting: string;
    onSortingChange: (s: string) => void;
}

const SelectPopper = ({
    anchorEl,
    options,
    sorting,
    onSortingChange,
}: SelectPopperProps) => (
    <Popper
        open={true}
        anchorEl={anchorEl}
        sx={{
            zIndex: 1,
        }}
    >
        <Paper
            sx={{
                p: 1,
            }}
        >
            {options.map(({ label, value, icon }) => (
                <ListItem
                    key={value}
                    selected={value === sorting}
                    onClick={() => onSortingChange(value)}
                >
                    <ListItemIcon>
                        {icon ? <Iconify icon={icon} /> : null}
                    </ListItemIcon>
                    <ListItemText>{label}</ListItemText>
                </ListItem>
            ))}
        </Paper>
    </Popper>
);

export default SelectPopper;
