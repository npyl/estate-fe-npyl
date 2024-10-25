import { useTranslation } from "react-i18next";
import TypeSelect from "../Event/TypeSelect";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import { useFiltersContext } from "./context";
import Stack from "@mui/material/Stack";
import { TTypeFilter } from "./types";

const Filters = () => {
    const { t } = useTranslation();
    const { type, setType } = useFiltersContext();

    return (
        <Stack overflow="auto hidden">
            <TypeSelect<TTypeFilter> type={type} onChange={setType}>
                <ToggleButton value="ANY">
                    <Typography ml={1}>{t("All")}</Typography>
                </ToggleButton>
            </TypeSelect>
        </Stack>
    );
};

export default Filters;
