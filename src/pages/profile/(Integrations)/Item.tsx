import {
    Typography,
    Grid,
    Paper,
    Divider,
    Collapse,
    IconButton,
    Stack,
} from "@mui/material";
import { List, ListItem } from "src/components/List";
import SoftButton from "@/components/SoftButton";
import { SpaceBetween } from "@/components/styled";
import { useGetIntegrationsQuery } from "@/services/company";
import { useTranslation } from "react-i18next";
import { IntegrationSite } from "@/types/listings";
import useToggle from "@/hooks/useToggle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IIntegration } from "@/types/integrations";

interface Props {
    type: IntegrationSite;
    expandedInitialy: boolean;
    onEdit: (s: IIntegration) => void;
}

const IntegrationItem = ({ type, expandedInitialy, onEdit }: Props) => {
    const { t } = useTranslation();

    const { data: integration, isLoading } = useGetIntegrationsQuery(type);

    const [expanded, toggleExpanded] = useToggle(expandedInitialy);

    // if (isLoading) {
    //     return <Typography>{t("Loading...")}</Typography>;
    // }

    return (
        <Paper elevation={10}>
            <SpaceBetween
                sx={{
                    px: 2,
                    py: 1.5,
                    alignItems: "center",
                }}
                gap={1}
                direction={{
                    xs: "column",
                    lg: "row",
                }}
            >
                <Typography variant="h6">{integration?.site}</Typography>

                <Stack direction="row" spacing={1}>
                    <SoftButton
                        variant="contained"
                        disabled={!integration}
                        onClick={() => onEdit(integration!)}
                    >
                        {t("Edit")}
                    </SoftButton>
                    <IconButton
                        onClick={toggleExpanded}
                        sx={{
                            transform: expanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            transition: "transform 0.3s ease-in-out",
                        }}
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </Stack>
            </SpaceBetween>
            <Divider />
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <List>
                            <ListItem
                                label={t("Username")}
                                value={integration?.username || ""}
                            />
                            <ListItem
                                label={t("Password")}
                                value={integration?.password || ""}
                            />
                        </List>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <List>
                            <ListItem
                                label={t("API Key")}
                                value={integration?.apiKey || ""}
                            />
                            <ListItem
                                label={t("App Key")}
                                value={integration?.appKey || ""}
                            />
                        </List>
                    </Grid>
                </Grid>
            </Collapse>
        </Paper>
    );
};

export default IntegrationItem;
