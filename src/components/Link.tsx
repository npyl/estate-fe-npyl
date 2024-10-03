import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import React, { forwardRef } from "react";

type LinkProps = Omit<MuiLinkProps, "component" | "ref"> & NextLinkProps;

const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
    <MuiLink component={NextLink} {...props} ref={ref} />
));

Link.displayName = "Link";

export default Link;
