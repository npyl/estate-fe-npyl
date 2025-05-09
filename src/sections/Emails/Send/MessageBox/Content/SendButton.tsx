import LoadingIconButton, {
    LoadingIconButtonProps,
} from "@/components/LoadingIconButton";
import getBorderColor from "@/theme/borderColor";
import SendIcon from "@mui/icons-material/Send";
import { SxProps, Theme } from "@mui/material";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

const SendButtonSx: SxProps<Theme> = {
    position: "absolute",
    top: -50,
    right: 0,
    bgcolor: "background.paper",
    "&:hover": {
        bgcolor: "background.paper",
    },
    border: "1px solid",
    borderColor: getBorderColor,
};

const SendButton: FC<LoadingIconButtonProps> = ({ sx, ...props }) => {
    const { formState } = useFormContext();
    const isLoading = formState.isLoading;

    return (
        <LoadingIconButton
            type="submit"
            loading={isLoading}
            color="primary"
            sx={{ ...(SendButtonSx as any), ...sx }}
            {...props}
        >
            <SendIcon />
        </LoadingIconButton>
    );
};

export default SendButton;
