import { Divider, Paper, Stack, Typography } from "@mui/material";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { properties } from "src/services/properties";
import { useTranslation } from "react-i18next";
import PublicSites from "./PublicSites";
import Integrations from "./Integrations";

const Right = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const invalidateTags = useCallback(
        () =>
            dispatch(properties.util.invalidateTags(["PropertyByIdListings"])),
        []
    );

    return (
        <Paper
            elevation={10}
            component={Stack}
            p={2}
            px={4}
            alignItems="center"
            minHeight="400px"
        >
            <Typography variant="h4" my={5} textAlign="center">
                {t("Websites to publish to:")}
            </Typography>

            <Stack gap={1}>
                <PublicSites onClick={invalidateTags} />

                <Divider />

                <Integrations onClick={invalidateTags} />
            </Stack>
        </Paper>
    );
};

export default Right;
