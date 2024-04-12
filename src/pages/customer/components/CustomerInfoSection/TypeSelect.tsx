import { Button, Drawer, Grid, IconButton, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useTranslation } from "react-i18next";
import { RHFCheckbox } from "src/components/hook-form";
import { useFormContext } from "react-hook-form";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import useDialog from "@/hooks/useDialog";
import DemandSection from "../Demand";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import { getBorderColor2 } from "@/theme/borderColor";

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

const CustomerTypeSelect = () => {
    const { t } = useTranslation();

    const { watch } = useFormContext();

    const leaser = watch("leaser");
    const buyer = watch("buyer");

    // WARN: show DemandSection only if leaser or buyer
    const [isDrawerOpen, openDrawer, closeDrawer] = useDialog();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <>
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

                {leaser || buyer ? (
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
                ) : null}
            </Grid>

            {isDrawerOpen ? (
                <Drawer
                    anchor="right"
                    open={isDrawerOpen}
                    PaperProps={{
                        sx: {
                            position: "absolute",
                            zIndex: 3,
                            width: isMobile ? "100%" : "50%",
                            p: 2,
                        },
                    }}
                    onClose={closeDrawer}
                >
                    {isMobile && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={closeDrawer}
                            sx={{ mt: 1, ml: 1 }}
                        >
                            <CloseOutlinedIcon />
                        </IconButton>
                    )}

                    <DemandSection />
                </Drawer>
            ) : null}
        </>
    );
};
export default CustomerTypeSelect;
