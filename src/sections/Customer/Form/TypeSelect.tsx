import { Button, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { RHFCheckbox } from "src/components/hook-form";
import { useWatch } from "react-hook-form";
import useDialog from "@/hooks/useDialog";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import { getBorderColor2 } from "@/theme/borderColor";
import dynamic from "next/dynamic";
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

    const [isDrawerOpen, openDrawer, closeDrawer] = useDialog();

    return (
        <>
            <StyledButton
                sx={{
                    position: "absolute",
                    top: -12,
                    right: -2,
                }}
                onClick={openDrawer}
                endIcon={<EditIcon />}
            >
                {t("Demands")}
            </StyledButton>

            {isDrawerOpen ? <DemandDrawer onClose={closeDrawer} /> : null}
        </>
    );
};

const CustomerTypeSelect = () => {
    const { t } = useTranslation();

    const { isVisible } = useDemandsButton();

    return (
        <Grid
            sx={{
                border: 1,
                borderColor: "divider",
                borderRadius: 1,
                p: 2,
                position: "relative",
            }}
            container
        >
            <Grid item xs={12} sm={6} md={3}>
                <RHFCheckbox name="seller" label={undefined} />
                <Typography variant="h6">{t("Seller")}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <RHFCheckbox name="lessor" label={undefined} />
                <Typography variant="h6">{t("Lessor")}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <RHFCheckbox name="leaser" label={undefined} />
                <Typography variant="h6">{t("Leaser")}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <RHFCheckbox name="buyer" label={undefined} />
                <Typography variant="h6">{t("Buyer")}</Typography>
            </Grid>

            {isVisible ? <DemandsButton /> : null}
        </Grid>
    );
};
export default CustomerTypeSelect;
