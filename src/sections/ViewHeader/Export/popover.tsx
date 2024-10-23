import { useTranslation } from "react-i18next";
import MuiPopover, { PopoverProps } from "@mui/material/Popover";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel, {
    FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import {
    Button,
    Stack,
    CircularProgress,
    Tooltip,
    IconButton,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { styled } from "@mui/material/styles";

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

interface ExportPopoverProps extends PopoverProps {
    onShare: VoidFunction;
    onDownload: VoidFunction;
    blueprints: boolean;
    setBlueprints: (b: boolean) => void;
    version: string;
    setVersion: (s: "LONG" | "SHORT") => void;
    loading: boolean; // Add loading prop
}

const Popover = ({
    onShare,
    onDownload,
    blueprints,
    setBlueprints,
    version,
    setVersion,
    loading, // Destructure loading prop
    ...props
}: ExportPopoverProps) => {
    const { t } = useTranslation();

    return (
        <MuiPopover
            {...props}
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
            <Stack direction="row" spacing={1}>
                <Button onClick={onShare} variant="outlined">
                    {t("Share PDF")}
                </Button>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Button onClick={onDownload} variant="contained">
                        {t("Download PDF")}
                    </Button>
                )}
            </Stack>
        </MuiPopover>
    );
};

export default Popover;
