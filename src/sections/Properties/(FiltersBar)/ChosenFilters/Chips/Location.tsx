import {
    useFiltersContext,
    useLocationSearch,
} from "@/sections/Properties/FiltersContext";
import Chip from "@mui/material/Chip";

const LocationChip = () => {
    const location = useLocationSearch();
    const { resetLocationSearch } = useFiltersContext();
    return <Chip label={location} onDelete={resetLocationSearch} />;
};

export default LocationChip;
