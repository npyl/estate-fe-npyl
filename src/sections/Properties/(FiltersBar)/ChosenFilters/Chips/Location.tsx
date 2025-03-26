import { deleteFilter, selectLocationSearch } from "@/slices/filters";
import Chip from "@mui/material/Chip";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const LocationChip = () => {
    const dispatch = useDispatch();

    const location = useSelector(selectLocationSearch);

    const handleDelete = useCallback(
        () => dispatch(deleteFilter("locationSearch")),
        []
    );

    return <Chip label={location} onDelete={handleDelete} />;
};

export default LocationChip;
