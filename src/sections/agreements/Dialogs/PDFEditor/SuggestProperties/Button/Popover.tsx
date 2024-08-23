import PropertySearch from "@/components/Search/PropertySearch";
import MuiPopover, {
    PopoverProps as MuiPopoverProps,
} from "@mui/material/Popover";
import { useRouter } from "next/router";
import { FC } from "react";

interface PopoverProps
    extends Omit<MuiPopoverProps, "open" | "anchorOrigin" | "transformOrigin"> {
    row: number;
}

const Popover: FC<PopoverProps> = ({ row, ...props }) => {
    const router = useRouter();
    const { customerId } = router.query;

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
            <PropertySearch
                customerId={+customerId!}
                onSelectProperty={() => {}}
            />
        </MuiPopover>
    );
};

export default Popover;
