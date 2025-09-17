import { Grid } from "@mui/material";
import { List, ListItem } from "@/components/List";
import { useGetIntegrationCredentialsQuery } from "@/services/company";
import { useTranslation } from "react-i18next";
import { IntegrationSite } from "@/types/integrations";
import ItemSkeleton from "../../Skeleton";
import { ComponentType, FC } from "react";
import BaseItem from "../../BaseItem";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
const EditDialog = dynamic(() => import("./EditDialog"));

interface ContentProps {
    type: IntegrationSite;
    isEditOpen: boolean;
    onEditClose: VoidFunction;
}

const Content: FC<ContentProps> = ({ type, isEditOpen, onEditClose }) => {
    const { t } = useTranslation();

    const { data, isLoading } = useGetIntegrationCredentialsQuery(type);

    if (isLoading) return <ItemSkeleton />;

    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem
                            label={t("Username")}
                            value={data?.username || ""}
                        />
                        <ListItem
                            label={t("Password")}
                            value={data?.password || ""}
                        />
                    </List>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem
                            label={t("API Key")}
                            value={data?.apiKey || ""}
                        />
                        <ListItem
                            label={t("App Key")}
                            value={data?.appKey || ""}
                        />
                    </List>
                </Grid>
            </Grid>

            {isEditOpen ? (
                <EditDialog open onClose={onEditClose} initialValues={data} />
            ) : null}
        </>
    );
};

interface Props {
    Icon?: ComponentType<any>;
    type: IntegrationSite;
    name: string;
    expandedInitialy: boolean;
}

const IntegrationItem: FC<Props> = ({ Icon, type, name, expandedInitialy }) => {
    const [isOpen, openEdit, closeEdit] = useDialog();
    return (
        <BaseItem
            type={name}
            Icon={Icon}
            onEdit={openEdit}
            expandedInitialy={expandedInitialy}
        >
            <Content type={type} isEditOpen={isOpen} onEditClose={closeEdit} />
        </BaseItem>
    );
};

export default IntegrationItem;
