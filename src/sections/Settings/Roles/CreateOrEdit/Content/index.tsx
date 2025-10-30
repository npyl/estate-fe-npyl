import { RHFTextField } from "@/components/hook-form";
import RHFMultilineTextField from "@/components/hook-form/RHFTextFieldMultiline";
import RHFColorPicker from "@/components/hook-form/RHFColorPicker";
import { useTranslation } from "react-i18next";
import Permissions from "./Permissions";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import RHFManagerMultipleAutocomplete from "@/ui/Autocompletes/RHFManagerMultiple";
import Basic from "./Basic";

const Content = () => {
    const { t } = useTranslation();
    return (
        <Stack spacing={3}>
            <Basic />

            <Divider />

            <Permissions />

            <Divider />

            <RHFManagerMultipleAutocomplete
                name="users"
                label={t<string>("Users")}
            />
        </Stack>
    );
};

export default Content;
