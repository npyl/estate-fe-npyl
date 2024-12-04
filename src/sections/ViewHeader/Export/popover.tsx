import { useTranslation } from "react-i18next";
import MuiPopover from "@mui/material/Popover";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel, {
    FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Stack, Tooltip, IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import { useExportPDF } from "@/services/exports";
import { FC, useCallback, useState } from "react";
import downloadBlob from "@/utils/downloadBlob";
import { useRouter } from "next/router";

const filename = "PropertyExport.pdf";

const downloadBlob0 = (b: Blob) => downloadBlob(b, filename);

interface DownloadButtonProps {
    version?: "SHORT" | "LONG";
    blueprints: boolean;
}

const DownloadButton: FC<DownloadButtonProps> = ({ version, blueprints }) => {
    const { t, i18n } = useTranslation();

    const router = useRouter();
    const { propertyId } = router.query;

    const [exportPDF, { isLoading }] = useExportPDF();

    const handleDownload = useCallback(async () => {
        const res = await exportPDF({
            propertyId: +propertyId!,
            qrPath: "",
            blueprints,
            publicImages: version === "LONG",
            lang: i18n.language as "en" | "el",
        });

        if (!res) return;

        downloadBlob0(res);
    }, [i18n.language, blueprints, version, propertyId]);

    return (
        <LoadingButton
            disabled={isLoading}
            loading={isLoading}
            onClick={handleDownload}
            variant="contained"
        >
            {t("Download PDF")}
        </LoadingButton>
    );
};

// ---------------------------------------------------

interface ControlledLabelProps extends FormControlLabelProps {
    version?: "SHORT" | "LONG";
}

const StyledControlledLabel = styled(FormControlLabel)<ControlledLabelProps>(
    ({ theme, version, value }) => ({
        display: "flex",
        flexDirection: "row-reverse",
        justifyContent: "space-between",

        // INFO: these margins are important
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(0),
        paddingLeft: theme.spacing(1),

        borderRadius: "10px",

        color: version === value ? theme.palette.primary.main : "unset",

        "&:hover": {
            backgroundColor:
                theme.palette.mode === "light"
                    ? theme.palette.grey[100]
                    : theme.palette.neutral?.[800],
        },
    })
);

// ---------------------------------------------------

interface Props {
    anchorEl: HTMLElement;
    onClose: VoidFunction;
}

const Popover: FC<Props> = ({ anchorEl, onClose }) => {
    const { t } = useTranslation();

    // Download Options
    const [blueprints, setBlueprints] = useState(false);
    const [version, setVersion] = useState<"LONG" | "SHORT">("LONG");

    return (
        <MuiPopover
            open
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            keepMounted
            slotProps={{
                paper: {
                    sx: {
                        p: 1,

                        width: "max-content",
                        height: "max-content",
                        overflowY: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                    },
                },
            }}
        >
            <FormGroup>
                <StyledControlledLabel
                    control={<Checkbox />}
                    label={
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {t("Short Version")}
                            <Tooltip
                                title={t(
                                    "Short Version: Includes basic photos"
                                )}
                                placement="top"
                                enterDelay={500}
                            >
                                <IconButton
                                    size="small"
                                    style={{ marginLeft: 4 }}
                                >
                                    <InfoOutlinedIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </div>
                    }
                    labelPlacement="start"
                    version="SHORT"
                    value={version}
                    checked={version === "SHORT"}
                    onChange={() => setVersion("SHORT")}
                />
                <StyledControlledLabel
                    control={<Checkbox />}
                    label={
                        <div style={{ display: "flex", alignItems: "center" }}>
                            {t("Long Version")}
                            <Tooltip
                                title={t("Long Version: Includes all photos")}
                                placement="top"
                                enterDelay={500}
                            >
                                <IconButton
                                    size="small"
                                    style={{ marginLeft: 4 }}
                                >
                                    <InfoOutlinedIcon fontSize="small" />
                                </IconButton>
                            </Tooltip>
                        </div>
                    }
                    labelPlacement="start"
                    version="LONG"
                    value={version}
                    checked={version === "LONG"}
                    onChange={() => setVersion("LONG")}
                />
                <StyledControlledLabel
                    control={<Checkbox />}
                    label={t("Blueprints")}
                    labelPlacement="start"
                    value={blueprints}
                    checked={blueprints}
                    onChange={(_, b) => setBlueprints(b)}
                />
            </FormGroup>
            <Stack direction="row" spacing={1} justifyContent="center">
                <DownloadButton version={version} blueprints={blueprints} />
            </Stack>
        </MuiPopover>
    );
};

export default Popover;
