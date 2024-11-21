import Stack from "@mui/material/Stack";
import { useFormContext } from "react-hook-form";
import { attachmentsKey } from "../_constants";
import { useTranslation } from "react-i18next";

const Attachments = () => {
    const { t } = useTranslation();

    const { watch } = useFormContext();

    const attachments = (watch(attachmentsKey) as number[]) || [];

    if (attachments.length === 0) return null;

    return (
        <Stack direction="row" gap={1} flexWrap="wrap">
            {attachments?.length} {t("attachments")}
        </Stack>
    );
};

export default Attachments;
