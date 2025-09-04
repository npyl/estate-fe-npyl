import Link from "@/components/Link";
import CodeBadge, { CodeBadgeProps } from "@/ui/Property/CodeBadge";
import isFalsy from "@/utils/isFalsy";
import { FC } from "react";

interface CodeBadgeLinkProps extends CodeBadgeProps {
    propertyId?: number;
}

const CodeBadgeLink: FC<CodeBadgeLinkProps> = ({
    propertyId,
    sx,
    ...props
}) => (
    <Link href={isFalsy(propertyId) ? "" : `/property/${propertyId}`}>
        <CodeBadge
            sx={{
                "&:hover": {
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light" ? "#d4a500" : "#b38f00",
                },
            }}
            {...props}
        />
    </Link>
);

export default CodeBadgeLink;
