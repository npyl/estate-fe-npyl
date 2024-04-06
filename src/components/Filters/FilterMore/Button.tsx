import { ButtonProps } from "@mui/material/Button";
import { StyledPriceButton } from "../styled";
import Badge from "@mui/material/Badge";
import TuneIcon from "@mui/icons-material/Tune";

interface FilterMoreButtonProps extends ButtonProps {
    changedFiltersCount: number;
}

const FilterMoreButton = ({
    changedFiltersCount,
    ...props
}: FilterMoreButtonProps) => (
    <StyledPriceButton open={false} disableRipple color="inherit" {...props}>
        <Badge badgeContent={changedFiltersCount} color="error">
            <TuneIcon />
        </Badge>
    </StyledPriceButton>
);

export default FilterMoreButton;
