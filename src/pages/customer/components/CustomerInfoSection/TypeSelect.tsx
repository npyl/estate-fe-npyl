import { Button, Drawer, Grid, IconButton, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useTranslation } from "react-i18next";
import { RHFCheckbox } from "src/components/hook-form";
import { useFormContext } from "react-hook-form";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import useDialog from "@/hooks/useDialog";
import DemandSection from "../Demand";

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
                <Grid item xs={6} sm={3}>
                    <RHFCheckbox name="seller" label={undefined} />
                    <Typography variant="h6">{t("Seller")}</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <RHFCheckbox name="lessor" label={undefined} />
                    <Typography variant="h6">{t("Lessor")}</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <RHFCheckbox name="leaser" label={undefined} />
                    <Typography variant="h6">{t("Leaser")}</Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <RHFCheckbox name="buyer" label={undefined} />
                    <Typography variant="h6">{t("Buyer")}</Typography>
                </Grid>

                {leaser && buyer ? (
                    <Button
                        sx={{
                            position: "absolute",
                            top: 2,
                            right: 2,
                        }}
                        onClick={openDrawer}
                    >
                        {t("Demands")}
                    </Button>
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
