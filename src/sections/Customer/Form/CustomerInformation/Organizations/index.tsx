import Stack from "@mui/material/Stack";
import Opener, { useOpener } from "@/components/Opener";
import FirmCreateDrawer from "@/sections/Organization/CreateDrawer";
import AddButton from "./AddButton";
import { useTranslation } from "react-i18next";
import RHFOrganization from "@/ui/Autocompletes/RHFOrganization";

const Organizations = () => {
    const { t } = useTranslation();
    const [openerRef, onClick] = useOpener();

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <RHFOrganization
                name="organization"
                label={t<string>("Organization")}
            />
            <Opener
                ref={openerRef}
                Clicker={AddButton}
                Component={FirmCreateDrawer}
                onClick={onClick}
            />
        </Stack>
    );
};

export default Organizations;
