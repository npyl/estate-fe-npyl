import Link from "@/components/Link";
import getBorderColor from "@/theme/borderColor";
import { TThreadRes } from "@/types/email";
import { SxProps, Theme } from "@mui/material";
import Typography from "@mui/material/Typography";
import { FC } from "react";

const ItemSx: SxProps<Theme> = {
    "&:hover": {
        boxShadow: 10,
        zIndex: 1,
        color: "text.primary",
        userSelect: "none",
        cursor: "pointer",
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
        bgcolor="background.paper"
        p={1}
        borderBottom="1px solid"
        borderColor={getBorderColor}
        color="text.secondary"
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
