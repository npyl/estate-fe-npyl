import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import ColumnSelect from "./Column";
import PriorityButtonGroup from "./Priority";

const ColumnSelectSx = { minWidth: "150px" };

const Buttons = () => {
    const { t } = useTranslation();

    return (
        <Stack direction="row" spacing={1}>
            <ColumnSelect label={t("_Column_")} sx={ColumnSelectSx} />
            <PriorityButtonGroup />
        </Stack>
    );
};

export default Buttons;
