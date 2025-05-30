import FormBottomBar from "@/ui/FormBottomBar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import CancelIcon from "@mui/icons-material/Cancel";

interface ActionsProps {
    onCancel: VoidFunction;
}

const Actions: FC<ActionsProps> = ({ onCancel }) => {
    const { t } = useTranslation();

    return (
        <FormBottomBar
            contentRight={
                <Stack direction="row" spacing={1} alignItems="center">
                    <Button
                        variant="outlined"
                        startIcon={<CancelIcon />}
                        onClick={onCancel}
                    >
                        {t("Cancel")}
                    </Button>

                    <Button type="submit">{t("Save")}</Button>
                </Stack>
            }
            contentLeft={undefined}
        />
    );
};

export default Actions;
