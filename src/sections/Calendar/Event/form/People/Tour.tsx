import RHFTextField from "@/components/hook-form/RHFTextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { peopleKey } from "./constants";
import { SpaceBetween } from "@/components/styled";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import useDialog from "@/hooks/useDialog";
import { FC, useCallback, useMemo } from "react";
import { TCalendarEventPerson } from "@/components/Calendar/types";
import PersonIcon from "@mui/icons-material/Person";
import TextField from "@mui/material/TextField";
import useTextField from "@/hooks/useTextField";
import RemoveIcon from "@mui/icons-material/Remove";
import { withoutGwEmail } from "@/types/calendar/mapper";

// -------------------------------------------------------------------------

interface AddProps {
    onClose: VoidFunction;
}

const Add: FC<AddProps> = ({ onClose }) => {
    const { t } = useTranslation();

    const { watch, setValue } = useFormContext();

    const [firstName, onFirstNameChange] = useTextField("");
    const [lastName, onLastNameChange] = useTextField("");

    const isDirty = Boolean(firstName) && Boolean(lastName);

    const handleAdd = () => {
        const people = (watch(peopleKey) as TCalendarEventPerson[]) || [];

        setValue(peopleKey, [...people, { firstName, lastName }], {
            shouldDirty: true,
        });

        onClose();
    };

    return (
        <Stack spacing={1}>
            <Stack direction="row" spacing={1}>
                <TextField
                    fullWidth
                    label={t("First Name")}
                    value={firstName}
                    onChange={onFirstNameChange}
                />
                <TextField
                    fullWidth
                    label={t("Last Name")}
                    value={lastName}
                    onChange={onLastNameChange}
                />
            </Stack>
            <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button onClick={onClose}>{t("Cancel")}</Button>
                <Button
                    variant="contained"
                    disabled={!isDirty}
                    onClick={handleAdd}
                >
                    {t("Add")}
                </Button>
            </Stack>
        </Stack>
    );
};

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
    const { watch } = useFormContext();
    const people = (watch(peopleKey) as TCalendarEventPerson[]) || [];
    const filtered = useMemo(() => people?.filter(withoutGwEmail), [people]);
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
            <SpaceBetween alignItems="center">
                <Typography>{t("People")}</Typography>
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
