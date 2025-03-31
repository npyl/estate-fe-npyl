import {
    useFiltersContext,
    useLocationSearch,
} from "@/sections/Properties/FiltersContext";
import Chip from "@mui/material/Chip";
import { useCallback } from "react";

const LocationChip = () => {
    const location = useLocationSearch();

    const { deleteFilter } = useFiltersContext();
    const handleDelete = useCallback(() => deleteFilter("locationSearch"), []);

    return <Chip label={location} onDelete={handleDelete} />;
};

export default LocationChip;
