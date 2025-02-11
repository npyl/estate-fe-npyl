import { Grid, Typography, Container } from "@mui/material";
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
                    <Typography
                        variant="h5"
                        style={{
                            textAlign: "center",
                            color: "rgba(0, 0, 0, 0.7)",
                        }}
                    >
                        {t("There are no owned properties")}
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Placeholder;
