import { deleteFilter, selectActiveState } from "@/slices/filters";
import Chip from "@mui/material/Chip";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const ActiveChip = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const isActive = useSelector(selectActiveState);
    const activeLabel = isActive ? t("Active") : t("Inactive");

    const handleDelete = () => dispatch(deleteFilter("active"));

    return <Chip label={activeLabel} onDelete={handleDelete} />;
};

export default ActiveChip;
