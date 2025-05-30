import Stack from "@mui/material/Stack";
import Opener, { useOpener } from "@/components/Opener";
import FirmCreateDrawer from "@/sections/Organization/CreateDrawer";
import AddButton from "./AddButton";
import { useTranslation } from "react-i18next";
import RHFOrganization from "@/ui/Autocompletes/RHFOrganization";
import { useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { ICustomerYup } from "../../types";

const Organizations = () => {
    const { t } = useTranslation();
    const [openerRef, onClick] = useOpener();

    const { setValue } = useFormContext<ICustomerYup>();
    const onCreate = useCallback(
        (id: number) => setValue("organization", id, { shouldDirty: true }),
        []
    );

    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <RHFOrganization
                name="organization"
                label={t<string>("Organization")}
            />
            <Opener
                ref={openerRef}
                Clicker={AddButton}
                onClick={onClick}
                // ...
                Component={FirmCreateDrawer}
                ComponentProps={{
                    onCreate,
                }}
            />
        </Stack>
    );
};

export default Organizations;
