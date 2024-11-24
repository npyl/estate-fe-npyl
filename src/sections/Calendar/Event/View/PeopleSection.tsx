import {
    TCalendarEventPerson,
    TCalendarEventType,
} from "@/components/Calendar/types";
import { SpaceBetween } from "@/components/styled";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import { FC } from "react";
import { useTranslation } from "react-i18next";

const People = dynamic(
    () => import("@/components/Calendar/Event/_shared/People")
);

interface Props {
    people: TCalendarEventPerson[];
    type: TCalendarEventType;
}

const PeopleSection: FC<Props> = ({ people, type }) => {
    const { t } = useTranslation();

    if (type === "TASK") return null;

    const label = type === "MEETING" ? "Meeting with" : "Tour";

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Typography>{t(label)}:</Typography>
            <People p={people} type={type} />
        </Stack>
    );
};

export default PeopleSection;
