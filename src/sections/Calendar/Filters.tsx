import Stack from "@mui/material/Stack";
import TypeSelect from "@/sections/Calendar/Event/TypeSelect";
import { useState } from "react";
import { TCalendarEventType } from "@/components/Calendar/types";
import ToggleButton from "@mui/material/ToggleButton";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

type TTypeFilter = TCalendarEventType | "ANY";

const Filters = () => {
    const { t } = useTranslation();

    const [type, setType] = useState<TTypeFilter>("ANY");

    return (
        <Stack>
            <TypeSelect<TTypeFilter> type={type} onChange={setType}>
                <ToggleButton value="ANY">
                    <Typography ml={1}>{t("Any")}</Typography>
                </ToggleButton>
            </TypeSelect>
        </Stack>
    );
};

export default Filters;
