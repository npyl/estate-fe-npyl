import { useTranslation } from "react-i18next";
import Permissions from "./Permissions";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Basic from "./Basic";

const Content = () => {
    const { t } = useTranslation();
    return (
        <Stack spacing={3}>
            <Basic />

            <Divider />

            <Permissions />
        </Stack>
    );
};

export default Content;
