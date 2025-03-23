import { deleteFilter } from "@/slices/filters";
import Chip from "@mui/material/Chip";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const PointsChip = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleDelete = useCallback(
        () => dispatch(deleteFilter("points")),
        []
    );

    return <Chip label={t("Shape")} onDelete={handleDelete} />;
};

export default PointsChip;
