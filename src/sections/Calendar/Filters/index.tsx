import { useTranslation } from "react-i18next";
import TypeSelect from "../Event/TypeSelect";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import { useFiltersContext } from "./context";
import { TTypeFilter } from "./types";

const Filters = () => {
    const { t } = useTranslation();
    const { type, setType } = useFiltersContext();

    return (
        <TypeSelect<TTypeFilter> type={type} onChange={setType}>
            <ToggleButton value="ANY">
                <Typography ml={1}>{t("All")}</Typography>
            </ToggleButton>
        </TypeSelect>
    );
};

export default Filters;
