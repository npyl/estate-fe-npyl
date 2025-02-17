import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import ColumnSelect from "./Column";
import AttachmentsButton from "./Attachments";

const ColumnSelectSx = { minWidth: "150px" };

interface ButtonsProps {
    cardId?: number;
}

const Buttons: FC<ButtonsProps> = ({ cardId }) => {
    const { t } = useTranslation();

    return (
        <Stack direction="row" spacing={1}>
            <AttachmentsButton cardId={cardId} />
            <ColumnSelect label={t("_Column_")} sx={ColumnSelectSx} />
        </Stack>
    );
};

export default Buttons;
