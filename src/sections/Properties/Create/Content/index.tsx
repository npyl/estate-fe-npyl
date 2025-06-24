import { Stack, Paper, Typography, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import SaveButton from "./SaveButton";
import RHFParentCategory from "./RHFParentCategory";
import RHFCategory from "./RHFCategory";

const Content = () => {
    const { t } = useTranslation();

    return (
        <Container maxWidth="md">
            <Paper component={Stack} p={2}>
                <Typography variant="h5" gutterBottom>
                    {t("Create a new property")}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {t(
                        "Choose a parent category and category for your property"
                    )}
                </Typography>

                <RHFParentCategory />
                <RHFCategory />
            </Paper>

            <Stack direction="row" justifyContent="center" marginTop={3}>
                <SaveButton />
            </Stack>
        </Container>
    );
};

export default Content;
