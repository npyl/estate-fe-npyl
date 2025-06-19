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
import { useGetIntegrationCredentialsQuery } from "@/services/company";
import { useTranslation } from "react-i18next";
import { IntegrationSite } from "@/types/integrations";
import useToggle from "@/hooks/useToggle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IIntegrationCredentials } from "@/types/integrations";
import ItemSkeleton from "../Skeleton";
import { ComponentType, FC } from "react";

interface Props {
    Icon?: ComponentType<any>;
    type: IntegrationSite;
    name: string;
    expandedInitialy: boolean;
    onEdit: (s: IIntegrationCredentials) => void;
}

const IntegrationItem: FC<Props> = ({
    Icon,
    type,
    name,
    expandedInitialy,
    onEdit,
}) => {
    const { t } = useTranslation();

    const [expanded, toggleExpanded] = useToggle(expandedInitialy);

    const { data: integration, isLoading } = useGetIntegrationCredentialsQuery(
        type,
        {
            skip: !expanded,
        }
    );

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
                <Stack direction="row" spacing={1} alignItems="center">
                    {Icon ? <Icon width={30} height={30} /> : null}
                    <Typography variant="body1" color="text.secondary">
                        {name}
                    </Typography>
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
