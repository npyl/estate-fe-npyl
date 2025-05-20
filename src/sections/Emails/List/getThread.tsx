import Link from "@/components/Link";
import { getBorderColor2 } from "@/theme/borderColor";
import { primary } from "@/theme/light-theme-options";
import { TThreadRes } from "@/types/email";
import { alpha, SxProps, Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FC, useMemo } from "react";

const ItemSx: SxProps<Theme> = {
    "&:hover": {
        ":first-of-type": {
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
        },

        boxShadow: 10,
        userSelect: "none",
        cursor: "pointer",

        bgcolor: alpha(primary.light, 0.3),
    },

    ":not(:last-of-type)": {
        borderBottom: "1px solid",
        borderColor: getBorderColor2,
    },
};

interface ThreadDateProps {
    date: string;
}

const ThreadDate: FC<ThreadDateProps> = ({ date }) => {
    const DATE = useMemo(
        () =>
            new Date(date).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "2-digit",
                hour12: true,
            }),
        [date]
    );

    return (
        <Typography
            fontWeight="500"
            noWrap
            whiteSpace="nowrap"
            width="max-content"
            overflow="visible"
        >
            {DATE}
        </Typography>
    );
};

interface ThreadItemProps {
    e: TThreadRes;
}

const ThreadItem: FC<ThreadItemProps> = ({ e }) => (
    <Link
        display="flex"
        flexDirection="row"
        gap={1}
        alignItems="center"
        p={1}
        href={`/emails/${e.id}`}
        sx={ItemSx}
    >
        <Typography fontWeight="500" width={{ xs: "40%", lg: "20%" }} noWrap>
            {e.subject}
        </Typography>
        <Typography variant="body2" width={1} noWrap>
            {e.snippet}
        </Typography>
        <ThreadDate date={e.date} />
    </Link>
);

const getThread = (e: TThreadRes) => <ThreadItem key={e.id} e={e} />;

export default getThread;
