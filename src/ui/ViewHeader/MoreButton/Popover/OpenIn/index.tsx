import { Button, Divider } from "@mui/material";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import PublicLogo from "@/assets/logo/Public";
import usePropertyListings from "@/sections/Properties/hooks/usePropertyListings";
import { ChevronLeft } from "@mui/icons-material";
import useDialog from "@/hooks/useDialog";
import dynamic from "next/dynamic";
const SideMenu = dynamic(() => import("./SideMenu"));

interface OpenInProps {
    menuAnchor: HTMLElement;
}

const OpenIn: FC<OpenInProps> = ({ menuAnchor }) => {
    const { t } = useTranslation();

    const { publicListings, restListings } = usePropertyListings();

    const { hasPublic, hasSpitogato } = useMemo(() => {
        const hasPublic = publicListings.some(({ published }) => published);

        const hasSpitogato = restListings.find(
            ({ integrationSite }) => integrationSite === "SPITOGATOS"
        )?.published;

        return {
            hasPublic,
            hasSpitogato,
        };
    }, [publicListings, restListings]);

    // Hide this component if we have nothing...
    const hasNothing = !hasPublic && !hasSpitogato;

    const [isOpen, open, close] = useDialog();

    if (hasNothing) return null;

    return (
        <>
            <Button
                fullWidth
                variant="text"
                startIcon={<ChevronLeft />}
                endIcon={<PublicLogo />}
                onClick={open}
            >
                {t("Open in")}
            </Button>

            <Divider flexItem />

            {isOpen ? (
                <SideMenu
                    anchorEl={menuAnchor}
                    onClose={close}
                    publicListings={publicListings}
                />
            ) : null}
        </>
    );
};

export default OpenIn;
