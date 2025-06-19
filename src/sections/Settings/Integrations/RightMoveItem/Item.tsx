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
import useToggle from "@/hooks/useToggle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IIntegrationCredentials } from "@/types/integrations";
import ItemSkeleton from "../Skeleton";
import RightMoveIcon from "@/assets/integrations/RightMoveIcon";
import { FC } from "react";

interface Props {
    onEdit: (s: IIntegrationCredentials) => void;
}

const IntegrationItem: FC<Props> = ({ onEdit }) => {
    const { t } = useTranslation();

    const [expanded, toggleExpanded] = useToggle(false);

    const { data: integration, isLoading } = useGetIntegrationCredentialsQuery(
        "RIGHT_MOVE",
        {
            skip: !expanded,
        }
    );

    if (isLoading) {
        return <ItemSkeleton />;
    }

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
                    <RightMoveIcon width={30} height={30} />
                    <Typography variant="body1" color="text.secondary">
                        rightmove.co.uk
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
                                label={t("BranchId")}
                                value={integration?.branchId || ""}
                            />
                        </List>
                    </Grid>
                </Grid>
            </Collapse>
        </Paper>
    );
};

export default IntegrationItem;
