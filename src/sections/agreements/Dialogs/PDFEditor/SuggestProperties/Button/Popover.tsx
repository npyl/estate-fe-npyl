import PropertySearch from "@/components/Search/PropertySearch";
import MuiPopover, {
    PopoverProps as MuiPopoverProps,
} from "@mui/material/Popover";
import { useRouter } from "next/router";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

interface PopoverProps
    extends Omit<MuiPopoverProps, "open" | "anchorOrigin" | "transformOrigin"> {
    row: number;
}

const Popover: FC<PopoverProps> = ({ row, ...props }) => {
    const router = useRouter();
    const { customerId: id_0 } = router.query;

    const { watch } = useFormContext();
    const id_1 = watch("ownerId") as number;

    // INFO: first try from router (/customer/[id]: create/edit); then try ownerId (/agreements: edit)
    const ownerId = id_0 ? +id_0 : id_1;

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
            {...props}
        >
            <PropertySearch customerId={ownerId} onSelectProperty={() => {}} />
        </MuiPopover>
    );
};

export default Popover;
