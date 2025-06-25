import { RHFTextField } from "@/components/hook-form";
import RHFEditor from "@/components/hook-form/RHFEditor";
import Stack from "@mui/material/Stack";
import { useTranslation } from "react-i18next";

const Content = () => {
    const { t } = useTranslation();
    return (
        <Stack spacing={1}>
            <RHFTextField label={t("Label")} name="title" />
            <RHFEditor name="content" height="500px" />
        </Stack>
    );
};

export default Content;
