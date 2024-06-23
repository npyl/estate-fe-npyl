import { styled } from "@mui/material/styles";
import { FilterButton } from "@/components/Filters";

const FilterToggleButton = styled(FilterButton)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: theme.spacing(1.5),
    gap: theme.spacing(2),
}));

export default FilterToggleButton;
