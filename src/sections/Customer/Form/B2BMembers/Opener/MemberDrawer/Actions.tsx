import { B2BMemberReq } from "@/types/customer";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Props {
    onCancel: VoidFunction;
    onSave: (d: B2BMemberReq) => void;
}

const Actions: FC<Props> = ({ onCancel, onSave }) => {
    const { t } = useTranslation();
    const methods = useFormContext<B2BMemberReq>();
    return (
        <Stack direction="row" spacing={1}>
            <Button onClick={onCancel}>{t("Cancel")}</Button>
            <Button variant="contained" onClick={methods.handleSubmit(onSave)}>
                {t("Save")}
            </Button>
        </Stack>
    );
};

export default Actions;
