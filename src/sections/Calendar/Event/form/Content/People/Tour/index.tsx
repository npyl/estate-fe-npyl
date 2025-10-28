import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { peopleKey } from "../constants";
import { SpaceBetween } from "@/components/styled";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import useDialog from "@/hooks/useDialog";
import { FC, useCallback, useMemo } from "react";
import { TCalendarEventPerson } from "@/components/Calendar/types";
import PersonIcon from "@mui/icons-material/Person";
import RemoveIcon from "@mui/icons-material/Remove";
import { withoutGwEmailAndNonCustomer } from "@/types/calendar/mapper";
import Customers from "./Customers";
import dynamic from "next/dynamic";
import { CalendarEventReq } from "@/types/calendar";
const Add = dynamic(() => import("./Add"));

// -------------------------------------------------------------------------

interface PersonProps {
    p: TCalendarEventPerson;
}

const Person: FC<PersonProps> = ({ p }) => {
    const { watch, setValue } = useFormContext();

    const handleRemove = useCallback(() => {
        const people = (watch(peopleKey) as TCalendarEventPerson[]) || [];
        const filtered = people?.filter(
            ({ firstName, lastName }) =>
                firstName !== p.firstName && lastName !== p.lastName
        );
        setValue(peopleKey, filtered, { shouldDirty: true });
    }, []);

    return (
        <SpaceBetween alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
                <PersonIcon />
                <Typography>
                    {p.firstName || ""} {p.lastName || ""}
                </Typography>
            </Stack>
            <IconButton onClick={handleRemove}>
                <RemoveIcon />
            </IconButton>
        </SpaceBetween>
    );
};

// -------------------------------------------------------------------------

const getPerson = (p: TCalendarEventPerson) => (
    <Person key={`${p.firstName}_${p.lastName}`} p={p} />
);

// -------------------------------------------------------------------------

const useTourPeople = () => {
    const people =
        (useWatch<CalendarEventReq>({
            name: peopleKey,
        }) as TCalendarEventPerson[]) || [];
    const filtered = useMemo(
        () => people.filter(withoutGwEmailAndNonCustomer),
        [people]
    );
    return filtered;
};

// -------------------------------------------------------------------------

const Tour = () => {
    const { t } = useTranslation();

    const [isOpen, openAdd, closeAdd] = useDialog();

    const people = useTourPeople();

    return (
        <Stack
            bgcolor="background.default"
            p={1}
            borderRadius="16px"
            spacing={1}
        >
            <Customers />

            <SpaceBetween alignItems="center">
                <Typography>
                    {t("Customers")} ({t("non-registered")})
                </Typography>
                <IconButton onClick={openAdd} disabled={isOpen}>
                    <AddIcon />
                </IconButton>
            </SpaceBetween>

            {/* List */}
            {people.map(getPerson)}

            {/* Add */}
            {isOpen ? <Add onClose={closeAdd} /> : null}
        </Stack>
    );
};

export default Tour;
