import { useTranslation } from "react-i18next";
import TypeSelect from "../Event/TypeSelect";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import { useFiltersContext } from "./context";
import Stack from "@mui/material/Stack";
import { TTypeFilter } from "./types";
import Search from "./Search";

const Filters = () => {
    const { t } = useTranslation();
    const { type, setType } = useFiltersContext();

    return (
        <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            width={1}
            overflow="auto hidden"
        >
            <Search />

            <TypeSelect<TTypeFilter> type={type} onChange={setType}>
                <ToggleButton value="ANY">
                    <Typography ml={1}>{t("All")}</Typography>
                </ToggleButton>
            </TypeSelect>
        </Stack>
    );
};

export default Filters;
