import { ButtonProps } from "@mui/material/Button";
import { FilterButton } from "../../../components/Filters/styled";
import Badge from "@mui/material/Badge";
import TuneIcon from "@mui/icons-material/Tune";
import { FC } from "react";

interface FilterMoreButtonProps extends ButtonProps {
    changedFiltersCount: number;
}

const FilterMoreButton: FC<FilterMoreButtonProps> = ({
    changedFiltersCount,
    ...props
}) => (
    <FilterButton disableRipple color="inherit" {...props}>
        <Badge badgeContent={changedFiltersCount} color="error">
            <TuneIcon />
        </Badge>
    </FilterButton>
);

export default FilterMoreButton;
