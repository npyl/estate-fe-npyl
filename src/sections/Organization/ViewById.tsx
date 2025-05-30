import {
    Container,
    Divider,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { List, ListItem } from "src/components/List";
import SoftButton from "@/components/SoftButton";
import { SpaceBetween } from "@/components/styled";
import { FC, useCallback, useRef } from "react";
import {
    useGetOrganizationQuery,
    useRemoveAvatarMutation,
    useUploadAvatarMutation,
} from "@/services/organization";
import BaseAvatarPicker from "@/ui/AvatarPicker";
import Opener, { OpenerRef } from "@/components/Opener";
import OrganizationCreateDrawer from "./CreateDrawer";

interface AvatarPickerProps {
    avatar?: string;
    organisationId: number;
}

const AvatarPicker: FC<AvatarPickerProps> = ({ avatar, organisationId }) => {
    const [uploadAvatar, { isLoading: isUploading }] =
        useUploadAvatarMutation();
    const [removeAvatar, { isLoading: isRemoving }] = useRemoveAvatarMutation();

    const isLoading = isUploading || isRemoving;

    const onSelect = useCallback(
        (file: File) => uploadAvatar({ file, organisationId }),
        [organisationId]
    );

    const onDelete = useCallback(
        () => removeAvatar(organisationId),
        [organisationId]
    );

    return (
        <BaseAvatarPicker
            isLoading={isLoading}
            // ...
            userId={-1}
            src={avatar}
            // ...
            onSelect={onSelect}
            onDelete={onDelete}
        />
    );
};

interface EditButtonProps {
    onClick: VoidFunction;
}

const EditButton: FC<EditButtonProps> = ({ onClick }) => {
    const { t } = useTranslation();
    return <SoftButton onClick={onClick}>{t("Edit")}</SoftButton>;
};

interface ViewByIdProps {
    id: number;
}

const ViewById: FC<ViewByIdProps> = ({ id }) => {
    const { t } = useTranslation();

    const { data } = useGetOrganizationQuery(id);

    const openerRef = useRef<OpenerRef>(null);
    const onClick = useCallback(() => openerRef.current?.open(), []);

    return (
        <Container maxWidth="md">
            <Paper>
                <SpaceBetween
                    sx={{
                        px: 2,
                        py: 1.5,
                    }}
                >
                    <Typography variant="h6" flex={1} mt={1}>
                        {t("Organization")}
                    </Typography>

                    <Opener
                        ref={openerRef}
                        Clicker={EditButton}
                        onClick={onClick}
                        // ...
                        Component={OrganizationCreateDrawer}
                        ComponentProps={{
                            organization: data,
                        }}
                    />
                </SpaceBetween>
                <Divider />
                <Stack p={3} justifyContent="center" alignItems="center">
                    <AvatarPicker organisationId={id} avatar={data?.avatar} />
                </Stack>
                <Divider />
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <List>
                            <ListItem
                                label={t("Name")}
                                value={data?.name || ""}
                            />
                            <ListItem
                                label={t("Email")}
                                value={data?.email || ""}
                            />
                        </List>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <List>
                            <ListItem
                                label={t("Phone")}
                                value={data?.phone || ""}
                            />
                            <ListItem
                                label={t("ΓΕΜΥ")}
                                value={data?.gemh || ""}
                            />
                        </List>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default ViewById;
