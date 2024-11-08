import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import Create from "./Create";
import List from "./List";

const Comments = () => {
    const { t } = useTranslation();

    return (
        <Stack spacing={1}>
            <Typography fontWeight="bold">{t("Activity")}</Typography>
            <List />
            <Create />
        </Stack>
    );
};

export default Comments;
