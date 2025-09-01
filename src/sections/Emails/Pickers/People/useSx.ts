import { useMemo } from "react";
import { getTagClassname } from "@/ui/Autocompletes/People";
import { SxProps, Theme } from "@mui/material";
import { useRouter } from "next/router";
import toNumberSafe from "@/utils/toNumberSafe";

const getSx = (customerId: number): SxProps<Theme> => ({
    // INFO: disable ability to delete tag chip that corresponds to current property (e.g. when opening Emails from tab from PropertyById)
    [`.${getTagClassname(customerId)}`]: {
        ".MuiChip-deleteIcon": {
            display: "none",
        },
    },
});

const useSx = () => {
    const router = useRouter();
    const { customerId } = router.query;
    const iCustomerId = toNumberSafe(customerId);
    return useMemo(() => getSx(iCustomerId), [iCustomerId]);
};

export default useSx;
