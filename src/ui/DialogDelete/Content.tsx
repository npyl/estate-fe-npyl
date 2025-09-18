import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FC } from "react";

const DELETE_RECORD = "DELETE_RECORD";
const DELETE_RECORD_PLURAL = "DELETE_RECORDS";
const CANNOT_BE_UNDONE = "CANNOT_BE_UNDONE";

interface ContentProps {
    multiple: boolean;
}

const Content: FC<ContentProps> = ({ multiple }) => {
    const { t } = useTranslation();

    return (
        <>
            <Typography variant="h5" fontWeight={400}>
                {t("Are you sure?")}
            </Typography>
            {multiple ? t(DELETE_RECORD) : t(DELETE_RECORD_PLURAL)}
            <br />
            {t(CANNOT_BE_UNDONE)}
        </>
    );
};

export default Content;
