import { Skeleton, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useWatch } from "react-hook-form";
import { CalendarEventReq } from "@/types/calendar";
import { RHFTextField } from "@/components/hook-form";
import RHFTypeSelect from "./RHFTypeSelect";
import dynamic from "next/dynamic";
import RHFEditor from "@/components/hook-form/RHFEditor";
import { EVENT_POPOVER_TITLE_TESTID } from "../constants";
import RHFEventDates from "./RHFEventDates";
const Color = dynamic(() => import("./Color"), {
    loading: () => <Skeleton variant="circular" width="30px" height="30px" />,
});
const People = dynamic(() => import("./People"));
const RHFLocation = dynamic(() => import("./RHFLocation"));

// ------------------------------------------------------------------------

const PeopleLoader = () => {
    const type = useWatch<CalendarEventReq>({ name: "type" });
    const isNotTask = type !== "TASK";

    if (isNotTask) return <People />;

    return null;
};

// ------------------------------------------------------------------

const TextFieldSx = {
    px: 0.5,
};

const Content = () => {
    const { t } = useTranslation();

    return (
        <>
            <RHFTextField
                data-testid={EVENT_POPOVER_TITLE_TESTID}
                variant="standard"
                name="title"
                placeholder={t<string>("Title")}
                sx={TextFieldSx}
            />

            <RHFEventDates startDateName="startDate" endDateName="endDate" />

            <RHFLocation />

            <Stack direction="row" spacing={1}>
                <Color />
                <RHFTypeSelect />
            </Stack>

            <PeopleLoader />

            <RHFEditor name="description" rows={5} />
        </>
    );
};

export default Content;
