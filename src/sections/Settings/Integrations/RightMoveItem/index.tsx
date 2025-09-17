import { Grid } from "@mui/material";
import { List, ListItem } from "@/components/List";
import { useGetIntegrationCredentialsQuery } from "@/services/company";
import { useTranslation } from "react-i18next";
import ItemSkeleton from "../Skeleton";
import { FC } from "react";
import INTEGRATIONS_ICONS from "@/assets/icons/integrations";
import BaseItem from "../BaseItem";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
const EditDialog = dynamic(() => import("./EditDialog"));

const RightMoveIcon: FC<any> = (props) => {
    const Icon = INTEGRATIONS_ICONS["RIGHT_MOVE"];
    return <Icon {...props} />;
};

interface ContentProps {
    isEditOpen: boolean;
    onEditClose: VoidFunction;
}

const Content: FC<ContentProps> = ({ isEditOpen, onEditClose }) => {
    const { t } = useTranslation();

    const { data, isLoading } = useGetIntegrationCredentialsQuery("RIGHT_MOVE");

    if (isLoading) return <ItemSkeleton />;

    return (
        <>
            <Grid container>
                <Grid item xs={12} sm={6}>
                    <List>
                        <ListItem
                            label={t("BranchId")}
                            value={data?.branchId || ""}
                        />
                    </List>
                </Grid>
            </Grid>

            {isEditOpen ? <EditDialog onClose={onEditClose} /> : null}
        </>
    );
};

const RightMoveItem = () => {
    const [isOpen, openEdit, closeEdit] = useDialog();
    return (
        <BaseItem type="rightmove.co.uk" Icon={RightMoveIcon} onEdit={openEdit}>
            <Content isEditOpen={isOpen} onEditClose={closeEdit} />
        </BaseItem>
    );
};

export default RightMoveItem;
