import { Chip } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { deleteFilter, selectMinFloor } from "src/slices/filters";
import useEnums from "../../useEnums";
import ChipLabel from "./ChipLabel";
import { useSelector } from "react-redux";
import getEnumLabel from "./util";

const MinFloorChip = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { minFloorEnum } = useEnums();

    const minValue = useSelector(selectMinFloor);
    const minLabel = getEnumLabel(minValue, minFloorEnum);

    const handleClear = () => dispatch(deleteFilter("minFloor"));

    return (
        <Chip
            label={<ChipLabel title={t("Minimum Floor")} value={minLabel} />}
            onDelete={handleClear}
        />
    );
};

export default MinFloorChip;
