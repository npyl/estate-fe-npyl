import { SpaceBetween } from "@/components/styled";
import Comments from "./Comments";
import CreatedAt from "./CreatedAt";
import { FC } from "react";
import { StackProps } from "@mui/material";

interface FooterProps extends StackProps {
    commentsCount: number;
    createdAt: string;
}

const Footer: FC<FooterProps> = ({ commentsCount, createdAt, ...props }) => (
    <SpaceBetween
        alignItems="center"
        borderTop="1px solid"
        borderColor="divider"
        pt={0.5}
        {...props}
    >
        <Comments count={commentsCount} />
        <CreatedAt createdAt={createdAt} />
    </SpaceBetween>
);

export default Footer;
