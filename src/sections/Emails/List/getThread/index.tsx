import Link from "@/components/Link";
import { getBorderColor2 } from "@/theme/borderColor";
import { primary } from "@/theme/light-theme-options";
import { TThreadShortRes } from "@/types/email";
import { alpha, Stack, SxProps, Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import Attachments from "./Attachments";
import ThreadDate from "./ThreadDate";

const ItemSx: SxProps<Theme> = {
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
};

interface ThreadItemProps {
    e: TThreadShortRes;
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
        <Stack direction="row" width="calc(100% - 80px)">
            <Stack width="40%" overflow="hidden" textOverflow="ellipsis">
                <Typography fontWeight="500" noWrap width="90%">
                    {e.subject}
                </Typography>
                <Typography color="text.secondary">{e.from || ""}</Typography>
            </Stack>
            <Stack width={1} overflow="hidden" textOverflow="ellipsis">
                <Typography variant="body2" width={0.9} noWrap>
                    {e.snippet}
                </Typography>
                {e.attachments.length > 0 ? (
                    <Attachments attachments={e.attachments} />
                ) : null}
            </Stack>
        </Stack>

        <ThreadDate date={e.date} />
    </Link>
);

const getThread = (e: TThreadShortRes) => <ThreadItem key={e.id} e={e} />;

export default getThread;
