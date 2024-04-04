import { Button, Drawer, Grid, IconButton, Typography } from "@mui/material";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useTranslation } from "react-i18next";
import { RHFCheckbox } from "src/components/hook-form";
import DemandSection from "../Demand";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const CustomerTypeSelect = () => {
    const { t } = useTranslation();

    const { watch } = useFormContext();

    const leaser = watch("leaser");
    const buyer = watch("buyer");

    const allSelected = leaser && buyer;

    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }

            setDrawerOpen(open);
        };

    const isLeaser = watch("leaser");

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

            <Grid>
                {allSelected && (
                    <Button
                        sx={{
                            position: "absolute",
                            top: 2,
                            right: 2,
                        }}
                        onClick={toggleDrawer(true)}
                    >
                        {t("Demands")}
                    </Button>
                )}
                {drawerOpen ? (
                    <Drawer
                        anchor="right"
                        open={drawerOpen}
                        PaperProps={{
                            sx: {
                                width: isMobile ? "100%" : "50%",
                                mt: 10,
                            },
                        }}
                        onClose={toggleDrawer(false)}
                    >
                        {isMobile && (
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={toggleDrawer(false)}
                                sx={{ mt: 1, ml: 1 }}
                            >
                                <CloseOutlinedIcon />
                            </IconButton>
                        )}
                        <DemandSection />
                    </Drawer>
                ) : null}
            </Grid>
        </Grid>
    );
};
export default CustomerTypeSelect;
