import { Popover, PopoverProps } from "@mui/material";
import { ListItem } from "@/components/Filters";
import { TSortByOptions } from "./types";
import Iconify from "@/components/iconify";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FC } from "react";

// ---------------------------------------------------------------

const slotProps: PopoverProps["slotProps"] = {
    paper: {
        sx: {
            p: 0.5,
        },
    },
};

// ---------------------------------------------------------------

interface SelectPopoverProps extends PopoverProps {
    options: TSortByOptions;
    sorting: string;
    onSortingChange: (s: string) => void;
}

const SelectPopover: FC<SelectPopoverProps> = ({
    options,
    sorting,
    onSortingChange,
    ...props
}) => (
    <Popover
        {...props}
        sx={{
            ...props.sx,
            zIndex: 1000,
        }}
        slotProps={slotProps}
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
    </Popover>
);

export default SelectPopover;
