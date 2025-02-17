import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
    Chip,
    Paper,
    Stack,
    SxProps,
    Theme,
    Typography,
    useTheme,
} from "@mui/material";
import { green, purple, yellow } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";
import { format } from "date-fns"; // for date formatting
import Link from "next/link";
import { FC } from "react";
import { ILog, TLogAction } from "@/types/logs"; // import your log type
import Avatar from "@/components/Avatar";
import { SpaceBetween } from "../styled";

interface LogCardProps {
    log: ILog;
}

const getCardBackgroundColor = (action: TLogAction) => (theme: Theme) => {
    switch (action) {
        case "CREATE":
            return alpha(green[500], 0.1); // even lighter green
        case "EDIT":
            return alpha(yellow[700], 0.1); // even lighter yellow
        case "ADD":
            return alpha(yellow[700], 0.1); // even lighter yellow
        case "DELETE":
            return alpha(theme.palette.error.main, 0.1); // even lighter red
        case "RESTORE":
            return alpha("#EFCFEC", 0.2); // make it lighter
        case "DOWNLOAD":
            return alpha("#CBEBF2", 0.2); // make it lighter
        case "LOGIN":
        case "LOGOUT":
            return "background.paper";

        default:
            return ""; // default, no background color or whatever you prefer
    }
};

const getLogCardSx = (action: TLogAction): SxProps<Theme> => ({
    position: "relative",
    padding: 2,
    marginTop: 1,
    backgroundColor: getCardBackgroundColor(action),
});

const LogCard: FC<LogCardProps> = ({ log }) => {
    const { user } = log || {};
    const { avatar, firstName, lastName } = user || {};

    const theme = useTheme();
    const formattedDate = format(new Date(log.createdAt), "dd-MM-yyyy hh:mm");

    const getLabelColor = () => {
        switch (log?.action?.key) {
            case "CREATE":
                return green[400]; // Lighter shade of green
            case "EDIT":
                return yellow[600]; // Lighter shade of yellow
            case "ADD":
                return yellow[600]; // Lighter shade of yellow
            case "DELETE":
                return theme.palette.error.light; // Lighter shade of red
            case "RESTORE":
                return purple[600]; // Lighter shade of purple
            case "DOWNLOAD":
                return alpha("#33C6E4", 0.6); // A lighter approximation of "#00BCE1"
            case "LOGIN":
            case "LOGOUT":
                return "black";

            default:
                return theme.palette.text.primary; // default color
        }
    };

    const action = log.action?.key;

    return (
        <Paper elevation={3} sx={getLogCardSx(action)}>
            <SpaceBetween spacing={1} alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                    <Avatar
                        src={avatar}
                        firstName={firstName}
                        lastName={lastName}
                    />

                    <Stack>
                        <Typography variant="subtitle1">
                            <strong>
                                {log?.user?.firstName} {log?.user?.lastName}{" "}
                            </strong>
                            {log?.message}

                            <Link
                                href={
                                    log?.customerId
                                        ? `/customer/${log?.customerId}`
                                        : `/property/${log?.propertyId}`
                                }
                                passHref
                            >
                                {log?.customerId
                                    ? log?.customerId
                                    : log?.propertyCode}
                            </Link>
                        </Typography>

                        <Typography
                            variant="caption"
                            display="block"
                            gutterBottom
                            style={{ color: theme.palette.text.secondary }}
                        >
                            <AccessTimeIcon
                                fontSize="inherit"
                                style={{
                                    verticalAlign: "middle",
                                    marginRight: theme.spacing(0.5),
                                }}
                            />
                            {formattedDate}
                        </Typography>
                    </Stack>
                </Stack>

                <Chip
                    label={log?.action?.value} // assuming it's the human-readable action value
                    style={{
                        backgroundColor: getLabelColor(), // color based on action
                        color: "#FFFFFF", // set text color to white
                    }}
                />
            </SpaceBetween>
        </Paper>
    );
};

export type { LogCardProps };
export default LogCard;
