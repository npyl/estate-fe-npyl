import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import ColumnSelect from "./Column";
import AttachmentsButton from "./Attachments";

const ColumnSelectSx = { minWidth: "150px" };

interface ButtonsProps {
    columnId?: number;
}

const Buttons: FC<ButtonsProps> = ({ columnId }) => {
    const { t } = useTranslation();

    return (
        <Stack direction="row" spacing={1}>
            <AttachmentsButton />

            <ColumnSelect
                label={t("_Column_")}
                defaultValue={columnId}
                sx={ColumnSelectSx}
            />
        </Stack>
    );
};

export default Buttons;
