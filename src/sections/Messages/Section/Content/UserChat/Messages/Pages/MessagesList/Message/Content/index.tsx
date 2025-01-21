import useDialog from "@/hooks/useDialog";
import { SxProps, Theme } from "@mui/material/styles";
import Typography, { TypographyProps } from "@mui/material/Typography";
import dynamic from "next/dynamic";
import { FC, useRef } from "react";
const Popover = dynamic(() => import("./Popover"));

const getTextSx = (isCurrentUser: boolean): SxProps<Theme> =>
    isCurrentUser
        ? {
              bgcolor: "primary.main",
              color: ({ palette: { mode } }) =>
                  mode === "light" ? "white" : "neutral.200",

              "&:hover": {
                  bgcolor: "primary.dark",
              },
          }
        : {
              bgcolor: ({ palette: { mode } }) =>
                  mode === "light" ? "neutral.200" : "neutral.700",

              "&:hover": {
                  bgcolor: "neutral.300",
              },
          };

interface ContentProps extends Omit<TypographyProps, "children"> {
    content: string;
    currentUser: boolean;
    createdAt: string;
}

const Content: FC<ContentProps> = ({
    currentUser,
    content,
    createdAt,
    ...props
}) => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [isOpen, openPopover, closePopover] = useDialog();

    return (
        <>
            <Typography
                ref={anchorRef}
                className="pp-message-content"
                p={1}
                borderRadius="16px"
                sx={{
                    // INFO: make sure the content breaks if not fitting
                    whiteSpace: "wrap",
                    wordBreak: "break-word",
                    overflowWrap: "break-word",

                    cursor: "pointer",

                    ...getTextSx(currentUser),
                }}
                // ...
                onClick={openPopover}
                {...props}
            >
                {content}
            </Typography>

            {isOpen && anchorRef.current ? (
                <Popover
                    anchorEl={anchorRef.current}
                    currentUser={currentUser}
                    createdAt={createdAt}
                    onClose={closePopover}
                />
            ) : null}
        </>
    );
};

export default Content;
