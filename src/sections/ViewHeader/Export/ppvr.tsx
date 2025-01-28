import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MuiPopover from "@mui/material/Popover";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
    useGeneratePDFMutation,
    useGetPDFGeneratedAtQuery,
    useGetPDFQuery,
} from "@/services/properties";
import { useRouter } from "next/router";
import Stack from "@mui/material/Stack";
import useDateLocale from "@/hooks/useDateLocale";
import Skeleton from "@mui/material/Skeleton";

// ----------------------------------------------------------------------------

const GenerateButton = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { t } = useTranslation();

    const [generate] = useGeneratePDFMutation();

    const handleGenerate = () => {
        generate({ propertyId: +propertyId!, qrPath: "" });
    };

    return <Button onClick={handleGenerate}>{t("Generate")}</Button>;
};

const DownloadButton = () => {
    const router = useRouter();
    const { propertyId } = router.query;

    const { t } = useTranslation();

    const { isLoading } = useGetPDFQuery(+propertyId!);

    const handleDownload = useCallback(() => {}, []);

    if (isLoading) return <Skeleton width="100px" height="40px" />;

    return (
        <Button variant="contained" onClick={handleDownload}>
            {t("Download")}
        </Button>
    );
};

const NotGeneratedPlaceholder = () => {
    const { t } = useTranslation();
    return <Typography>{t("Not generated")}</Typography>;
};

interface GeneratedAtProps {
    generatedAt: number;
}

const GeneratedAt: FC<GeneratedAtProps> = ({ generatedAt }) => {
    const { t } = useTranslation();
    const loc = useDateLocale();
    return (
        <Stack direction="row" spacing={0.5} alignItems="center">
            <Typography variant="subtitle2">{t("Last generated:")}</Typography>
            <Typography variant="body2" color="text.secondary">
                {new Date(generatedAt).toLocaleDateString(loc)}
            </Typography>
        </Stack>
    );
};

const Content = () => {
    const router = useRouter();
    const { propertyId } = router.query;
    const { data } = useGetPDFGeneratedAtQuery(+propertyId!);

    const hasPDF = Boolean(data);

    return (
        <Stack spacing={3} p={1}>
            {!hasPDF ? <NotGeneratedPlaceholder /> : null}
            {hasPDF ? <GeneratedAt generatedAt={data!} /> : null}

            <Stack direction="row" justifyContent="center" spacing={1}>
                <GenerateButton />
                {hasPDF ? <DownloadButton /> : null}
            </Stack>
        </Stack>
    );
};

// ----------------------------------------------------------------------------

interface PopoverProps {
    anchorEl: HTMLElement;
    onClose: VoidFunction;
}

const Popover: FC<PopoverProps> = ({ anchorEl, onClose }) => (
    <MuiPopover
        open
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        transformOrigin={{ horizontal: "center", vertical: "top" }}
        anchorEl={anchorEl}
        onClose={onClose}
    >
        <Content />
    </MuiPopover>
);

export default Popover;
