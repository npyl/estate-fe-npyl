import Link from "@/components/Link";
import CodeBadge, { CodeBadgeProps } from "@/ui/Property/CodeBadge";
import { styled } from "@mui/material/styles";
import { FC } from "react";

const StyledCodeBadge = styled(CodeBadge)(({ theme }) => ({
    "&:hover": {
        backgroundColor: theme.palette.mode === "light" ? "#d4a500" : "#b38f00",
    },
}));

interface CodeBadgeLinkProps extends CodeBadgeProps {
    propertyId: number;
}

const CodeBadgeLink: FC<CodeBadgeLinkProps> = ({ propertyId, ...props }) => (
    <Link href={`/property/${propertyId}`}>
        <StyledCodeBadge {...props} />
    </Link>
);

export default CodeBadgeLink;
