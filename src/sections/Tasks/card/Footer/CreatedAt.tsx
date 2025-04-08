import { TODAY } from "@/components/BaseCalendar/constants";
import useCalendarLocale from "@/hooks/useDateLocale";
import useWidthObserver from "@/hooks/useWidthObserver";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FC, forwardRef, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

const CreatedAtIcon = () => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_718_11623)">
            <path
                d="M8.00016 4.00016V8.00016L10.6668 9.3335M14.6668 8.00016C14.6668 11.6821 11.6821 14.6668 8.00016 14.6668C4.31826 14.6668 1.3335 11.6821 1.3335 8.00016C1.3335 4.31826 4.31826 1.3335 8.00016 1.3335C11.6821 1.3335 14.6668 4.31826 14.6668 8.00016Z"
                stroke="#98A2B3"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
        <defs>
            <clipPath id="clip0_718_11623">
                <rect width="16" height="16" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

// -------------------------------------------------------------

interface Props {
    createdAt: string;
}

const ResponsiveTypography = forwardRef<HTMLDivElement, Props>(
    ({ createdAt }, ref) => {
        const { t } = useTranslation();

        const loc = useCalendarLocale();

        const date = new Date(createdAt).toDateString();
        const isToday = date === TODAY.toDateString();

        const [isSmall, setSmall] = useState(false);

        const handleWidth = useCallback((w: number) => {
            if (w < 60) setSmall(true);
        }, []);

        const { onRef } = useWidthObserver(ref, handleWidth);

        const label = createdAt
            ? isToday
                ? t("today")
                : new Date(createdAt).toLocaleDateString(loc, {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                  })
            : "-";

        return (
            <Typography ref={onRef} variant="body2">
                {label}
            </Typography>
        );
    }
);

ResponsiveTypography.displayName = "CreatedAtResponsiveTypography";

// -------------------------------------------------------------

interface Props {
    createdAt: string;
}

const CreatedAt: FC<Props> = ({ createdAt }) => (
    <Stack direction="row" alignItems="center" spacing={0.5}>
        <CreatedAtIcon />
        <ResponsiveTypography createdAt={createdAt} />
    </Stack>
);

export default CreatedAt;
