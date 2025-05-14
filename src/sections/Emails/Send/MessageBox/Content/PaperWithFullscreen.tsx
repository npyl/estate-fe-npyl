import { Paper, PaperProps, Portal, SxProps, Theme } from "@mui/material";
import { FC } from "react";
import getBorderColor from "@/theme/borderColor";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import useToggle from "@/hooks/useToggle";
import { Z_INDEX } from "@/constants/config";

const FullscreenButtonSx: SxProps<Theme> = {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
};

interface FullscreenButtonProps extends IconButtonProps {
    isFullscreen: boolean;
}

const FullscreenButton: FC<FullscreenButtonProps> = ({
    isFullscreen,
    sx,
    ...props
}) => (
    <IconButton size="small" sx={{ ...FullscreenButtonSx, ...sx }} {...props}>
        {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
    </IconButton>
);

const FACTOR = 3;

const NormalSx: SxProps<Theme> = {
    bottom: ({ spacing }) => spacing(FACTOR),
    width: {
        xs: "calc(100% - 50px)",
        lg: "700px",
    },
    height: "auto",

    ".tiptap": {
        maxHeight: "60vh",
    },
};

const FullscreenSx: SxProps<Theme> = {
    bottom: ({ spacing }) => spacing(FACTOR * 3),
    width: ({ spacing }) => `calc(100% - ${spacing(FACTOR * 2)})`,
    height: ({ spacing }) => `calc(100% - ${spacing(FACTOR * 4)})`,

    ".tiptap": {
        maxHeight: ({ spacing }) => `calc(100% - ${spacing(FACTOR * 4)})`,
    },
};

const getMessageBoxSx = (isFullscreen: boolean): SxProps<Theme> => {
    return {
        position: "fixed",

        right: ({ spacing }) => spacing(FACTOR),

        ...(isFullscreen ? FullscreenSx : NormalSx),

        zIndex: Z_INDEX.SIDEBAR + 1,
        backgroundColor: "background.paper",
        boxShadow: 20,
        border: "1px solid",
        borderColor: getBorderColor,
    };
};

const PaperWithFullscreen: FC<PaperProps> = ({ children, sx, ...props }) => {
    const [isFullscreen, toggle] = useToggle();

    return (
        <Portal>
            <Paper
                sx={{ ...getMessageBoxSx(isFullscreen), ...(sx as any) }}
                {...props}
            >
                <FullscreenButton
                    isFullscreen={isFullscreen}
                    onClick={toggle}
                />
                {children}
            </Paper>
        </Portal>
    );
};

export default PaperWithFullscreen;
