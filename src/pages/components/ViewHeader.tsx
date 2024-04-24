import {
    Box,
    Button,
    Divider,
    IconButton,
    Paper,
    Popover,
    Stack,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { SoftButton } from "src/components/SoftButton";
import { ReactNode, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SpitogatosSvg } from "src/assets/SpitogatosSvg";
import { PublicSvg } from "src/assets/PublicSvg";
import GoogleEarthSvg from "src/assets/GoogleEarth";
import { usePathname } from "next/navigation";
import { useGetProperty } from "src/hooks/property/hook";
import { DeleteDialog } from "src/components/Dialog/Delete";
import useDialog from "src/hooks/useDialog";
import { styled } from "@mui/material/styles";
import { getBorderColor2 } from "@/theme/borderColor";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import React from "react";

const CustomStack = styled(Stack)(({ theme }) => ({
    border: "1px solid",
    borderColor: getBorderColor2(theme),
    borderRadius: "10px",
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
}));

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
        <CustomStack flexDirection="row" gap={0.5} alignItems="center">
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
        </CustomStack>
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

    const [isDeleteOpen, openDelete, closeDelete] = useDialog();

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Paper
            sx={{
                borderColor: "divider",
                paddingLeft: 2,
                paddingRight: 1,
            }}
        >
            <Stack flexDirection="row" alignItems="center">
                <Box
                    sx={{
                        width: "100%",
                        overflowX: "auto",
                        whiteSpace: "nowrap",
                    }}
                >
                    <Stack
                        flex={1}
                        flexDirection="row"
                        sx={{ minWidth: "max-content" }}
                    >
                        {children}
                    </Stack>
                </Box>

                <IconButton
                    size="small"
                    aria-controls="menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                >
                    <MoreVertOutlinedIcon />
                </IconButton>
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                >
                    <Stack alignItems="center" p={1} spacing={1}>
                        {isProperty ? <OpenIn /> : null}

                        {onClone ? (
                            <Button
                                fullWidth
                                variant="outlined"
                                color="secondary"
                                onClick={onClone}
                            >
                                {t("Clone")}
                            </Button>
                        ) : null}

                        <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            onClick={onEdit}
                        >
                            {t("Edit")}
                        </Button>

                        <SoftButton
                            fullWidth
                            color="error"
                            onClick={openDelete}
                            startIcon={<DeleteIcon />}
                        >
                            {t("Delete")}
                        </SoftButton>

                        {isDeleteOpen ? (
                            <DeleteDialog
                                open={isDeleteOpen}
                                onClose={closeDelete}
                                onDelete={onDelete}
                            />
                        ) : null}
                        <Typography variant="body1" sx={{ fontSize: "13px" }}>
                            {t("Export options")}
                        </Typography>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            onClick={onEdit}
                            sx={{ width: "99%" }}
                        >
                            {t("Detailed")}
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={onEdit}
                            sx={{ width: "99%" }}
                        >
                            {t("Brief")}
                        </Button>
                    </Stack>
                </Popover>
            </Stack>
        </Paper>
    );
};

export default ViewHeader;
