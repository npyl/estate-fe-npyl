import { Paper, Popper } from "@mui/material";
import { ListItem } from "@/components/Filters";
import { TSortByOptions } from "./types";
import Iconify from "@/components/iconify";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import getBorderColor from "@/theme/borderColor";

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(1),
    border: "1px solid",
    borderColor: getBorderColor(theme),
}));

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
        open
        anchorEl={anchorEl}
        sx={{
            zIndex: 1000,
        }}
    >
        <StyledPaper>
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
        </StyledPaper>
    </Popper>
);

export default SelectPopper;
