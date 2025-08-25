import CrossedGoogleIcon from "@/assets/logo/CrossedGoogleLogo";
import useIsOfficeAdmin from "@/sections/Google/useIsOfficeAdmin";
import WorkspaceIndicator from "@/sections/Google/WorkspaceIndicator";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
import { FC } from "react";
import { useTranslation } from "react-i18next";
const RHFAutocomplete = dynamic(() => import("./RHF"));

interface Props {
    email?: string;
}

const NotAdminPlaceholder: FC<Props> = ({ email = "-" }) => {
    const { t } = useTranslation();

    return (
        <TextField
            disabled
            label="Google Workspace Email"
            value={email}
            InputProps={{
                endAdornment: (
                    <Tooltip
                        title={
                            <Typography>{t("WORKSPACE_ADMIN_ONLY")}</Typography>
                        }
                    >
                        <IconButton>
                            <CrossedGoogleIcon />
                        </IconButton>
                    </Tooltip>
                ),
            }}
        />
    );
};

const GoogleWorkspaceEmail: FC<Props> = ({ email }) => {
    const { gwIsAdmin } = useIsOfficeAdmin();

    if (!gwIsAdmin) return <NotAdminPlaceholder email={email} />;

    return (
        <Stack
            direction="row-reverse"
            spacing={1}
            alignItems="center"
            bgcolor="background.default"
            p={1}
            borderRadius="16px"
        >
            <WorkspaceIndicator>
                <RHFAutocomplete />
            </WorkspaceIndicator>
        </Stack>
    );
};

export default GoogleWorkspaceEmail;
