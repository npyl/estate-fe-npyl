import {
    deleteFilter,
    selectActiveState,
    selectLocationSearch,
} from "@/slices/filters";
import { Typography } from "@mui/material";
import Chip from "@mui/material/Chip";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const LocationChip = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const location = useSelector(selectLocationSearch);

    const handleDelete = () => dispatch(deleteFilter("locationSearch"));

    return <Chip label={location} onDelete={handleDelete} />;
};

export default LocationChip;
