import PropertySearch from "@/components/Search/PropertySearch";
import MuiPopover, {
    PopoverProps as MuiPopoverProps,
} from "@mui/material/Popover";
import { useRouter } from "next/router";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
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
    const router = useRouter();
    const { customerId: id_0 } = router.query;

    const { watch } = useFormContext();
    const id_1 = watch("ownerId") as number;

    // INFO: try from router (/customer/[id]: create/edit); then try ownerId (/agreements: edit)
    const ownerId = id_0 ? +id_0 : id_1;

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
                customerId={ownerId}
                NoResultsPlaceholder={NoResultsPlaceholder}
                onSelectProperty={autofill}
            />
        </MuiPopover>
    );
};

export default Popover;
