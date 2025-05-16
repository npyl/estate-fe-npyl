import Link from "@/components/Link";
import { getBorderColor2 } from "@/theme/borderColor";
import { primary } from "@/theme/light-theme-options";
import { TThreadRes } from "@/types/email";
import { alpha, SxProps, Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FC } from "react";

const ItemSx: SxProps<Theme> = {
    "&:hover": {
        ":first-child": {
            borderTopLeftRadius: 6,
            borderTopRightRadius: 6,
        },

        boxShadow: 10,
        zIndex: 2,
        userSelect: "none",
        cursor: "pointer",

        bgcolor: alpha(primary.light, 0.3),
    },

    ":not(:last-child)": {
        borderBottom: "1px solid",
        borderColor: getBorderColor2,
    },
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
        <Typography fontWeight="500" width="20%">
            {e.subject}
        </Typography>
        <Typography variant="body2" width={1}>
            {e.snippet}
        </Typography>
    </Link>
);

const getThread = (e: TThreadRes) => <ThreadItem key={e.id} e={e} />;

export default getThread;
