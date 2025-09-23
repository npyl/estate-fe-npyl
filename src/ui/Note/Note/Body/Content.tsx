import Reader from "@/components/Editor/Reader";
import { SxProps, Theme } from "@mui/material/styles";
import { FC } from "react";

const ContentSx: SxProps<Theme> = {
    backgroundColor: ({ palette: { mode, neutral } }) =>
        mode === "light" ? "#FCE9A4" : neutral?.[800],
    borderRadius: "7px",
    padding: "7px 7px",
    lineHeight: 1.4,
    fontSize: "0.95rem",
    color: "text.secondary",
    whiteSpace: "pre-wrap",
    "& p": { margin: 0 },
};

interface ContentProps {
    c?: string;
}

const Content: FC<ContentProps> = ({ c }) => (
    <Reader
        content={c}
        component="div"
        sx={ContentSx}
        width={`calc(100% - 110px)`}
    />
);

export default Content;
