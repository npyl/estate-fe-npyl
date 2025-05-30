import RHFFirm from "@/ui/Autocompletes/RHFFirm";
import Stack from "@mui/material/Stack";
import Opener, { useOpener } from "@/components/Opener";
import FirmCreateDrawer from "@/sections/Organization/CreateDrawer";
import AddButton from "./AddButton";
import { useTranslation } from "react-i18next";

const Firm = () => {
    const { t } = useTranslation();
    const [openerRef, onClick] = useOpener();

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <RHFFirm name="firm" label={t<string>("Firm")} />
            <Opener
                ref={openerRef}
                Clicker={AddButton}
                Component={FirmCreateDrawer}
                onClick={onClick}
            />
        </Stack>
    );
};

export default Firm;
