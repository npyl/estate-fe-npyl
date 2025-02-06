import { useAuth } from "@/hooks/use-auth";
import { useGetColorsQuery } from "@/services/calendar";
import MuiPopover from "@mui/material/Popover";
import { FC } from "react";
import Grid from "@mui/material/Grid";
import getColorOption from "./getColorOption";
import Skeletons from "./Skeletons";

// ------------------------------------------------------------------------

interface PopoverProps {
    anchorEl: HTMLElement;
    onClose: VoidFunction;
}

const Popover: FC<PopoverProps> = ({ anchorEl, onClose }) => {
    const { user } = useAuth();
    const { data, isLoading } = useGetColorsQuery(+user?.id!);

    return (
        <MuiPopover
            open
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            transformOrigin={{
                horizontal: "center",
                vertical: "top",
            }}
            onClose={onClose}
        >
            <Grid container spacing={1} p={1} width="80px">
                {isLoading ? <Skeletons /> : null}
                {data?.map(getColorOption)}
            </Grid>
        </MuiPopover>
    );
};

export default Popover;
