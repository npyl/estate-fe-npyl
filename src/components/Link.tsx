import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { FC } from "react";

type LinkProps = Omit<MuiLinkProps, "component"> & NextLinkProps;

const Link: FC<LinkProps> = (props) => (
    <MuiLink component={NextLink} {...props} />
);

export default Link;
