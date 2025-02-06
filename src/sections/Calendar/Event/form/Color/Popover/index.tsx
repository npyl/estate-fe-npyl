import { useAuth } from "@/hooks/use-auth";
import { useGetColorsQuery } from "@/services/calendar";
import MuiPopover from "@mui/material/Popover";
import { FC, useCallback } from "react";
import Grid from "@mui/material/Grid";
import getColorOption from "./getColorOption";
import Skeletons from "./Skeletons";
import { useFormContext } from "react-hook-form";
import { CalendarEventReq } from "@/types/calendar";

// ------------------------------------------------------------------------

interface PopoverProps {
    anchorEl: HTMLElement;
    onClose: VoidFunction;
}

const Popover: FC<PopoverProps> = ({ anchorEl, onClose }) => {
    const { user } = useAuth();
    const { data, isLoading } = useGetColorsQuery(+user?.id!);

    const { setValue } = useFormContext<CalendarEventReq>();
    const handleClick = useCallback((colorId: string) => {
        setValue("colorId", colorId, { shouldDirty: true });
        onClose();
    }, []);

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
                {data?.map(getColorOption(handleClick))}
            </Grid>
        </MuiPopover>
    );
};

export default Popover;
