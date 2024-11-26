import PropertySearch from "@/components/Search/PropertySearch";
import MuiPopover, {
    PopoverProps as MuiPopoverProps,
} from "@mui/material/Popover";
import { FC } from "react";
import useAutofill from "./hook";
import { PopoverSlotProps } from "./styled";
import NoResultsPlaceholder from "./NoResultsPlaceholder";

interface PopoverProps
    extends Omit<
        MuiPopoverProps,
        "open" | "anchorOrigin" | "transformOrigin" | "onClose"
    > {
    row: number;
    onClose: VoidFunction;
}

const Popover: FC<PopoverProps> = ({ row, ...props }) => {
    const { autofill } = useAutofill(row, props.onClose);

    return (
        <MuiPopover
            open
            anchorOrigin={{
                vertical: "center",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: "center",
                horizontal: "left",
            }}
            slotProps={PopoverSlotProps}
            {...props}
        >
            <PropertySearch
                showEmpty
                NoResultsPlaceholder={NoResultsPlaceholder}
                onSelectProperty={autofill}
            />
        </MuiPopover>
    );
};

export default Popover;
