import Avatar from "@/components/Avatar";
import Stack from "@mui/material/Stack";
import Typography, { TypographyProps } from "@mui/material/Typography";
import { FC } from "react";
import { useTranslation } from "react-i18next";

// --------------------------------------------------------------------------------

const OPTIONS: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
};

interface Reporter {
    firstName: string;
    lastName: string;
    avatar?: string;
}

interface UpdatedBy {
    firstName: string;
    lastName: string;
    avatar?: string;
}
interface LocalizedProps extends TypographyProps {
    prefix: string;
    date: string;
    reporter?: Reporter;
    updatedBy?: UpdatedBy;
}

const Localized: FC<LocalizedProps> = ({
    prefix,
    date,
    reporter,
    updatedBy,
    ...props
}) => {
    const { t, i18n } = useTranslation();

    const loc = i18n.language === "en" ? "en-US" : "el-GR";
    const dateObj = new Date(date);

    const formattedDate = dateObj.toLocaleDateString(loc, {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    });
    const formattedTime = dateObj.toLocaleTimeString(loc, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
    const fullName = reporter
        ? `${reporter.firstName || ""} ${reporter.lastName || ""}`.trim()
        : null;
    const fullNameUpdatedBy = updatedBy
        ? `${updatedBy.firstName || ""} ${updatedBy.lastName || ""}`.trim()
        : null;
    return (
        <Stack direction="row" spacing={1} alignItems="center">
            <Typography
                variant="body2"
                color="primary.main"
                fontWeight={600}
                {...props}
            >
                {formattedDate}{" "}
                <Typography component="span" variant="body2" fontWeight={600}>
                    - {formattedTime}
                </Typography>{" "}
            </Typography>
            <Typography variant="body2" color={"text.secondary"}>
                {" "}
                {t(prefix)}
            </Typography>
            {reporter && (
                <Stack direction="row" spacing={1} alignItems="center">
                    {reporter.avatar && (
                        <Avatar
                            src={reporter.avatar}
                            alt={fullName || ""}
                            sx={{ width: 24, height: 24 }}
                        />
                    )}
                    <Typography variant="body2" color="text.secondary">
                        {fullName}
                    </Typography>
                </Stack>
            )}
            {updatedBy && (
                <Stack direction="row" spacing={1} alignItems="center">
                    {updatedBy.avatar && (
                        <Avatar
                            src={updatedBy.avatar}
                            alt={fullName || ""}
                            sx={{ width: 24, height: 24 }}
                        />
                    )}
                    <Typography variant="body2" color="text.secondary">
                        {fullNameUpdatedBy}
                    </Typography>
                </Stack>
            )}
        </Stack>
    );
};

// --------------------------------------------------------------------------------

interface MiscInfoProps {
    createdAt?: string;
    updatedAt?: string;
    reporter?: Reporter;
    updatedBy?: UpdatedBy;
}
interface Reporter {
    firstName: string;
    lastName: string;
    avatar?: string;
}
interface UpdatedBy {
    firstName: string;
    lastName: string;
    avatar?: string;
}
const MiscInfo: FC<MiscInfoProps> = ({
    createdAt,
    updatedAt,
    reporter,
    updatedBy,
}) => {
    return (
        <Stack spacing={1}>
            {/* {createdAt && (
                <Localized
                    prefix="Created"
                    date={createdAt}
                    reporter={reporter}
                />
            )} */}
            {updatedAt && (
                <Localized
                    prefix="Updated by"
                    date={updatedAt}
                    updatedBy={updatedBy}
                />
            )}
        </Stack>
    );
};

export default MiscInfo;
