import {
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Paper,
    Stack,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { SoftButton } from "src/components/SoftButton";
import { ReactNode, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { SpitogatosSvg } from "src/assets/SpitogatosSvg";
import { PublicSvg } from "src/assets/PublicSvg";
import GoogleEarthSvg from "src/assets/GoogleEarth";
import { usePathname } from "next/navigation";
import { useGetProperty } from "src/hooks/property/hook";

const OpenIn = () => {
    const { t } = useTranslation();

    const { property } = useGetProperty();
    const { hasPublic, hasSpitogato, hasGoogleEarth } = useMemo(
        () => ({
            hasPublic: property?.listings?.PUBLIC_SITE || false,
            hasSpitogato: property?.listings?.SPITOGATOS || false,
            hasGoogleEarth: !!property?.googleEarth,
        }),
        [property]
    );

    // Hide this component if we have nothing...
    const hasNothing = useMemo(
        () => !hasPublic && !hasSpitogato && !hasGoogleEarth,
        [hasPublic, hasSpitogato, hasGoogleEarth]
    );

    const openPublic = useCallback(
        () =>
            window.open(
                `https://www.luxuryhomes.gr/property-detail/${property?.id}`,
                "_blank"
            ),
        [property?.id]
    );

    const openSpitogato = useCallback(() => {}, [property?.id]);

    const openGoogleEarth = useCallback(
        () => window.open(property?.googleEarth?.url, "_blank"),
        [property?.googleEarth?.url]
    );

    return hasNothing ? null : (
        <Stack
            flexDirection="row"
            gap={0.5}
            alignItems="center"
            sx={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                px: 1,
            }}
        >
            <Typography>{t("Open in")}</Typography>
            {hasPublic ? (
                <IconButton size="small" onClick={openPublic}>
                    <PublicSvg />
                </IconButton>
            ) : null}
            {hasSpitogato ? (
                <IconButton size="small" onClick={openSpitogato}>
                    <SpitogatosSvg />
                </IconButton>
            ) : null}
            {hasGoogleEarth ? (
                <IconButton size="small" onClick={openGoogleEarth}>
                    <GoogleEarthSvg />
                </IconButton>
            ) : null}
        </Stack>
    );
};

interface IViewHeaderProps {
    onEdit: VoidFunction;
    onDelete: VoidFunction;
    onClone?: VoidFunction;
    children?: ReactNode;
}

const ViewHeader = (props: IViewHeaderProps) => {
    const { onDelete, onEdit, onClone, children } = props;
    const { t } = useTranslation();
    const pathname = usePathname();

    const isProperty = useMemo(() => pathname.includes("property"), [pathname]);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    return (
        <Paper
            sx={{
                borderColor: "divider",
                paddingLeft: 2,
                paddingRight: 1,
                marginTop: 1,
            }}
        >
            <Stack flexDirection="row" alignItems="center">
                <Stack flex={1} flexDirection="row">
                    {children}
                </Stack>
                <Stack flexDirection="row" alignItems="center">
                    {isProperty ? <OpenIn /> : null}

                    {onClone ? (
                        <Button
                            variant="outlined"
                            color="secondary"
                            sx={{ mx: 1 }}
                            onClick={onClone}
                        >
                            {t("Clone")}
                        </Button>
                    ) : null}
                    <Button
                        variant="outlined"
                        color="secondary"
                        sx={{ mr: 1 }}
                        onClick={onEdit}
                    >
                        {t("Edit")}
                    </Button>

                    <SoftButton
                        color="error"
                        onClick={() => setDeleteDialogOpen(true)}
                        startIcon={<DeleteIcon />}
                    >
                        {t("Delete")}
                    </SoftButton>

                    {deleteDialogOpen ? (
                        <Dialog
                            maxWidth="xs"
                            open={deleteDialogOpen}
                            onClose={() => setDeleteDialogOpen(false)}
                            closeAfterTransition={true}
                        >
                            <DialogTitle sx={{ textAlign: "center" }}>
                                <HighlightOffIcon
                                    sx={{
                                        fontSize: "100px",
                                        stroke: "Window",
                                        strokeWidth: 1.5,
                                        color: "error.main",
                                    }}
                                />
                            </DialogTitle>
                            <DialogContent sx={{ textAlign: "center" }}>
                                <Typography variant="h5" fontWeight={400}>
                                    {t("Are you sure?")}
                                </Typography>
                            </DialogContent>
                            <DialogContentText
                                ml={3}
                                mr={3}
                                sx={{ textAlign: "center" }}
                            >
                                {t("Do you really want to delete this record?")}
                                <br />
                                {t("This process cannot be undone")}
                            </DialogContentText>
                            <DialogContent sx={{ textAlign: "center" }}>
                                <Button
                                    sx={{ mr: 1 }}
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => setDeleteDialogOpen(false)}
                                >
                                    {t("No")}
                                </Button>

                                <SoftButton color="error" onClick={onDelete}>
                                    {t("Yes")}
                                </SoftButton>
                            </DialogContent>
                        </Dialog>
                    ) : null}
                </Stack>
            </Stack>
        </Paper>
    );
};

export default ViewHeader;
