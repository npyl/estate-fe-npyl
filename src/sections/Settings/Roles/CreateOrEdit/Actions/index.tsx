import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import SubmitButton from "./SubmitButton";

interface Props {
    onCancel: VoidFunction;
}

const Actions: FC<Props> = ({ onCancel }) => {
    const { t } = useTranslation();

    return (
        <Stack direction="row" justifyContent="end" spacing={1}>
            <Button onClick={onCancel}>{t("Cancel")}</Button>
            <SubmitButton />
        </Stack>
    );
};

export default Actions;
