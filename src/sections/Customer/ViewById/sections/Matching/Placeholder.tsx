import { Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const Placeholder = () => {
    const { t } = useTranslation();
    return (
        <Container
            style={{
                height: "50vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "top",
            }}
        >
            <Grid container direction="column" alignItems="center" spacing={2}>
                <Grid item>
                    <span style={{ fontSize: "50px" }}>🏠</span>
                </Grid>
                <Grid item>
                    <Typography variant="h5" textAlign="center">
                        {t("There are no matching properties")}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Placeholder;
