import { SpaceBetween } from "@/components/styled";
import { IPublicSitesRes } from "@/types/company";
import { Typography } from "@mui/material";
import RemoveOpener from "./RemoveOpener";
import { FC } from "react";

interface PublicSiteProps {
    r: IPublicSitesRes;
}

const PublicSite: FC<PublicSiteProps> = ({ r: { id, siteUrl } }) => (
    <SpaceBetween alignItems="center">
        <Typography color="text.secondary">{siteUrl}</Typography>
        <RemoveOpener siteId={id} />
    </SpaceBetween>
);

const getPublicSite = (r: IPublicSitesRes) => <PublicSite key={r.id} r={r} />;

export default getPublicSite;
