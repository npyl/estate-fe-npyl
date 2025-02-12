import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useFormContext, useWatch } from "react-hook-form";
import useDialog from "@/hooks/useDialog";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import { getBorderColor2 } from "@/theme/borderColor";
import dynamic from "next/dynamic";
import { useCallback } from "react";
import { IDemandForms } from "./DemandDrawer/Form";
import { ICustomerYup } from "../types";
const DemandDrawer = dynamic(() => import("./DemandDrawer"));

// ------------------------------------------------------------

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    "&:hover": {
        backgroundColor: theme.palette.background.paper,
    },
    border: "1px solid",
    borderColor: getBorderColor2(theme),
    borderRadius: "50px",

    position: "absolute",
    top: theme.spacing(-2),
    right: theme.spacing(-2),
}));

// ------------------------------------------------------------

const useDemandsButton = () => {
    const leaser = useWatch({ name: "leaser" });
    const buyer = useWatch({ name: "buyer" });

    const demands = useWatch({ name: "demands" });
    const demandsCount = Array.isArray(demands) ? demands.length : -1;

    // INFO: show DemandSection *ONLY* if leaser or buyer or we have demands (e.g. Stay Updated)
    const isVisible = leaser || buyer || demandsCount > 0;

    return { isVisible };
};

// ------------------------------------------------------------------------------

const DemandsButton = () => {
    const { t } = useTranslation();

    const { isVisible } = useDemandsButton();
    const [isDrawerOpen, openDrawer, closeDrawer] = useDialog();

    const { setValue } = useFormContext<ICustomerYup>();
    const handleClose = useCallback(({ demands }: IDemandForms) => {
        setValue("demands", demands, { shouldDirty: true });
        closeDrawer();
    }, []);

    if (!isVisible) return null;

    return (
        <>
            <StyledButton onClick={openDrawer} endIcon={<EditIcon />}>
                {t("Demands")}
            </StyledButton>

            {isDrawerOpen ? <DemandDrawer onClose={handleClose} /> : null}
        </>
    );
};

export default DemandsButton;
