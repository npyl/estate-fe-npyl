import { useDispatch, useSelector } from "react-redux";
import useEnums from "./useEnums";
import {
    resetFloor,
    selectMaxFloor,
    selectMinFloor,
    setMaxFloor,
    setMinFloor,
} from "@/slices/filters";
import ClearableSection from "@/components/Filters/ClearableSection";
import { useTranslation } from "react-i18next";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Floors = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const { minFloorEnum, maxFloorEnum } = useEnums();

    const minFloors = useSelector(selectMinFloor) || 0;
    const maxFloors = useSelector(selectMaxFloor) || 0;

    const handleMinChange = (e: any) =>
        dispatch(
            setMinFloor(e.target.value === 0 ? undefined : e.target.value)
        );

    const handleMaxChange = (e: any) =>
        dispatch(
            setMaxFloor(e.target.value === 0 ? undefined : e.target.value)
        );

    return (
        <ClearableSection title={t("Floors")} reset={resetFloor}>
            <Stack
                direction={{
                    xs: "column",
                    sm: "row",
                }}
                spacing={1}
                alignItems={"center"}
            >
                <Select
                    sx={{ width: 130 }}
                    value={minFloors}
                    onChange={handleMinChange}
                >
                    {minFloorEnum.map(({ key, value }) => (
                        <MenuItem key={key} value={key}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>
                <Select
                    sx={{ width: 130 }}
                    value={maxFloors}
                    onChange={handleMaxChange}
                >
                    {maxFloorEnum.map(({ key, value }) => (
                        <MenuItem key={key} value={key}>
                            {value}
                        </MenuItem>
                    ))}
                </Select>
            </Stack>
        </ClearableSection>
    );
};

export default Floors;
