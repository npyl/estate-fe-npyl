import Link from "@/components/Link";
import { ICustomerMini } from "@/types/customer";
import { Button, SxProps, Theme } from "@mui/material";
import { FC } from "react";
import PersonIcon from "@mui/icons-material/Person";

const CustomerLinkSx: SxProps<Theme> = {
    textWrap: "nowrap",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 1,
    "&:hover": {
        cursor: "pointer",
        textDecoration: "underline",
    },
};

interface CustomerLinkProps {
    c?: ICustomerMini;
}

const CustomerLink: FC<CustomerLinkProps> = ({ c }) => {
    const fullname = `${c?.firstName || ""} ${c?.lastName || ""}`;

    return (
        <Button
            variant="outlined"
            sx={CustomerLinkSx}
            // ...
            LinkComponent={Link}
            href={`/customer/${c?.id}`}
            startIcon={<PersonIcon />}
            target="_blank"
            rel="noopener noreferrer"
        >
            {fullname}
        </Button>
    );
};

export default CustomerLink;
