import {
    Stack,
    IconButton,
    SxProps,
    Theme,
    Paper,
    PaperProps,
} from "@mui/material";
import Iconify from "src/components/iconify/Iconify";
import { FC } from "react";
import CreatedAt from "./CreatedAt";
import Content from "./Content";

const PaperSx: SxProps<Theme> = {
    backgroundColor: ({ palette: { mode, neutral } }) =>
        mode === "light" ? "#fce9a4" : neutral?.[700],
    p: 1.5,
    position: "relative",
    minHeight: "75px",
    ml: "40px",
};

const ButtonSx: SxProps<Theme> = {
    width: "fit-content",
    alignSelf: "flex-end",
};

interface BodyProps extends PaperProps {
    content: string;
    createdAt: string;
    onRemove: VoidFunction;
}

const Body: FC<BodyProps> = ({
    content,
    createdAt,
    sx,
    onRemove,
    ...props
}) => (
    <Paper sx={{ ...PaperSx, ...sx }} {...props}>
        <Stack position="absolute" top={10} right={15}>
            <CreatedAt createdAt={createdAt} />

            <IconButton sx={ButtonSx} onClick={onRemove}>
                <Iconify icon="eva:trash-2-outline" fontSize="20px" />
            </IconButton>
        </Stack>

        <Content c={content} />
    </Paper>
);

export default Body;
