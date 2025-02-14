import {
    Typography,
    Grid,
    Paper,
    Divider,
    Collapse,
    IconButton,
    Stack,
} from "@mui/material";
import { List, ListItem } from "@/components/List";
import SoftButton from "@/components/SoftButton";
import { SpaceBetween } from "@/components/styled";
import { useGetIntegrationsQuery } from "@/services/company";
import { useTranslation } from "react-i18next";
import { IntegrationSite } from "@/types/listings";
import useToggle from "@/hooks/useToggle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IIntegration } from "@/types/integrations";
import ItemSkeleton from "../Skeleton";
import { FC, ReactNode } from "react";

interface Props {
    icon?: ReactNode;
    type: IntegrationSite;
    expandedInitialy: boolean;
    onEdit: (s: IIntegration) => void;
}

const IntegrationItem: FC<Props> = ({
    icon,
    type,
    expandedInitialy,
    onEdit,
}) => {
    const { t } = useTranslation();

    const [expanded, toggleExpanded] = useToggle(expandedInitialy);

    const { data: integration, isLoading } = useGetIntegrationsQuery(type, {
        skip: !expanded,
    });

    if (isLoading) return <ItemSkeleton />;

    return (
        <Paper elevation={10}>
            <SpaceBetween
                px={2}
                py={1.5}
                alignItems="center"
                gap={1}
                direction="row"
            >
                <Stack direction="row" spacing={1}>
                    {icon}
                    <Typography variant="h6">{type}</Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                    {expanded ? (
                        <SoftButton
                            variant="contained"
                            size="small"
                            onClick={() => onEdit(integration!)}
                        >
                            {t("Edit")}
                        </SoftButton>
                    ) : null}

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
            <Collapse in={expanded} timeout="auto" mountOnEnter unmountOnExit>
                <Divider />
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
