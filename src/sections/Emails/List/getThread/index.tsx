import Link from "@/components/Link";
import { getBorderColor2 } from "@/theme/borderColor";
import { primary } from "@/theme/light-theme-options";
import { TThreadShortRes } from "@/types/email";
import { alpha, Stack, StackProps, SxProps, Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import Attachments from "./Attachments";
import ThreadDate, { DATE_WIDTH } from "./ThreadDate";

const TITLE_CLASSNAME = "PPThread-Title-Classname";

const UnreadSx: SxProps<Theme> = {
    [`.${TITLE_CLASSNAME}`]: {
        color: ({ palette: { mode } }) =>
            mode === "light" ? "black" : "white",
    },
};

const ReadSx: SxProps<Theme> = {
    bgcolor: ({ palette: { mode } }) =>
        mode === "light" ? "grey.100" : "neutral.800",
};

const getItemSx = (isUnread: boolean): SxProps<Theme> => ({
    ...(isUnread ? UnreadSx : ReadSx),

    "&:hover": {
        ":last-of-type": {
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 6,
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
});

interface ThreadItemProps extends StackProps {
    e: TThreadShortRes;
}

const ThreadItem: FC<ThreadItemProps> = ({ e, sx, ...props }) => (
    <Stack
        direction="row"
        gap={1}
        alignItems="center"
        p={1}
        sx={{ ...getItemSx(e.unread), ...(sx as any) }}
        {...props}
    >
        <Stack direction="row" width={`calc(100% - ${DATE_WIDTH})`}>
            <Typography
                width="30%"
                color="text.secondary"
                overflow="hidden"
                textOverflow="ellipsis"
            >
                {e.from || ""}
            </Typography>
            <Stack overflow="hidden" textOverflow="ellipsis" width={1}>
                <Typography
                    className={TITLE_CLASSNAME}
                    fontWeight="500"
                    color="text.secondary"
                    noWrap
                    width={1}
                >
                    {e.subject}
                </Typography>
                <Typography variant="body2" noWrap height={30} width="95%">
                    {e.snippet}
                </Typography>
                {e.attachments.length > 0 ? (
                    <Attachments attachments={e.attachments} width="95%" />
                ) : null}
            </Stack>
        </Stack>

        <ThreadDate date={e.date} />
    </Stack>
);

const getThread = (onClick: (id: string) => void) => (e: TThreadShortRes) => (
    <ThreadItem key={e.id} e={e} onClick={() => onClick(e.id)} />
);

export default getThread;
