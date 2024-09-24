import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {
    Avatar,
    Chip,
    Divider,
    Grid,
    Paper,
    Typography,
    useTheme,
} from "@mui/material";
import { green, purple, yellow } from "@mui/material/colors";
import { alpha } from "@mui/material/styles";
import { format } from "date-fns"; // for date formatting
import Link from "next/link";
import { FC } from "react";
import { ILog } from "src/types/logs"; // import your log type

export interface LogCardProps {
    log: ILog;
}

export const LogCard: FC<LogCardProps> = ({ log }) => {
    const theme = useTheme();
    const formattedDate = format(new Date(log.createdAt), "dd-MM-yyyy hh:mm");

    // const {data:property} = useGetPropertyByCodeQuery(+propertyCode!);
    const getCardBackgroundColor = () => {
        switch (log?.action?.key) {
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
            default:
                return ""; // default, no background color or whatever you prefer
        }
    };
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

            default:
                return theme.palette.text.primary; // default color
        }
    };
    const actionLabel = (
        <Chip
            label={log?.action?.value} // assuming it's the human-readable action value
            style={{
                backgroundColor: getLabelColor(), // color based on action
                color: "#FFFFFF", // set text color to white
                position: "relative", // absolutely position this element
                top: theme.spacing(1), // spacing from the top
                right: theme.spacing(1), // spacing from the right
            }}
        />
    );

    return (
        <Paper
            elevation={3}
            style={{
                position: "relative",
                padding: theme.spacing(2),
                marginTop: theme.spacing(1),
                backgroundColor: getCardBackgroundColor(), // set background color here
            }}
        >
            <Grid container spacing={2}>
                {/* Left: User info and Action */}
                <Grid item style={{ flexShrink: 0 }}>
                    <Avatar
                        style={{
                            marginRight: theme.spacing(1.5),
                        }}
                    >
                        {log?.user?.firstName.charAt(0)}
                    </Avatar>
                </Grid>
                <Grid item xs>
                    <Typography variant="subtitle1">
                        <>
                            <strong>
                                {log?.user?.firstName} {log?.user?.lastName}{" "}
                            </strong>
                            {log?.message}{" "}
                            <Link
                                href={
                                    log?.customerId
                                        ? `/customer/${log?.customerId}`
                                        : `/property/${log?.propertyId}`
                                }
                                passHref
                            >
                                {" "}
                                {log?.customerId
                                    ? log?.customerId
                                    : log?.propertyCode}
                            </Link>
                        </>
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
                </Grid>
                <Grid item xs={3} textAlign={"end"}>
                    {actionLabel}
                </Grid>
            </Grid>
            <Divider
                style={{
                    borderTop: "0px solid",
                    marginTop: theme.spacing(1),
                    marginBottom: theme.spacing(1),
                    borderColor: "rgba(0, 0, 0, 0.3)",
                }}
            />

            {/* Optional: Additional content can go here (e.g., if you want to expand on details or add interactive elements) */}
        </Paper>
    );
};

export default LogCard;
