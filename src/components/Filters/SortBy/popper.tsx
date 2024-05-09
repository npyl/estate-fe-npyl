import { Paper, Popper } from "@mui/material";
import { ListItem } from "@/components/Filters";
import { TSortByOptions } from "./types";

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
            {options.map(({ label, value }, i) => (
                <ListItem
                    key={i}
                    selected={value === sorting}
                    onClick={() => onSortingChange(value)}
                >
                    {label}
                </ListItem>
            ))}
        </Paper>
    </Popper>
);

export default SelectPopper;
