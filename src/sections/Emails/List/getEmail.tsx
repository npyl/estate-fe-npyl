import getBorderColor from "@/theme/borderColor";
import { TEmailRes } from "@/types/email";
import { SxProps, Theme } from "@mui/material";
import Stack from "@mui/material/Stack";
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

interface EmailItemProps {
    e: TEmailRes;
}

const EmailItem: FC<EmailItemProps> = ({ e }) => {
    return (
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            bgcolor="background.paper"
            p={1}
            borderBottom="1px solid"
            borderColor={getBorderColor}
            color="text.secondary"
            sx={ItemSx}
        >
            <Typography>{e.snippet}</Typography>
        </Stack>
    );
};

const getEmail = (e: TEmailRes) => <EmailItem e={e} />;

export default getEmail;
