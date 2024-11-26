import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { peopleKey } from "../constants";
import { FC } from "react";
import { TCalendarEventPerson } from "@/components/Calendar/types";
import TextField from "@mui/material/TextField";
import useTextField from "@/hooks/useTextField";

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

export default Add;
