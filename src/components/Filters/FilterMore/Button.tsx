import { ButtonProps } from "@mui/material/Button";
import { FilterButton } from "../styled";
import Badge from "@mui/material/Badge";
import TuneIcon from "@mui/icons-material/Tune";

interface FilterMoreButtonProps extends ButtonProps {
    changedFiltersCount: number;
}

const FilterMoreButton = ({
    changedFiltersCount,
    ...props
}: FilterMoreButtonProps) => (
    <FilterButton open={false} disableRipple color="inherit" {...props}>
        <Badge badgeContent={changedFiltersCount} color="error">
            <TuneIcon />
        </Badge>
    </FilterButton>
);

export default FilterMoreButton;
