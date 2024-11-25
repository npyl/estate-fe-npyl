import { Chip } from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteFilter, selectMaxFloor } from "src/slices/filters";
import useEnums from "../../useEnums";
import ChipLabel from "./ChipLabel";
import { useSelector } from "react-redux";
import getEnumLabel from "./util";
import { useTranslation } from "react-i18next";

const MaxFloorChip = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { maxFloorEnum } = useEnums();

    const maxValue = useSelector(selectMaxFloor);
    const maxLabel = getEnumLabel(maxValue, maxFloorEnum);

    const handleClear = () => dispatch(deleteFilter("maxFloor"));

    return (
        <Chip
            label={<ChipLabel title={t("Maximum Floor")} value={maxLabel} />}
            onDelete={handleClear}
        />
    );
};

export default MaxFloorChip;
