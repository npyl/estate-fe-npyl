import { IPublicSitesRes } from "@/types/company";
import { Typography } from "@mui/material";
import { FC } from "react";

interface PublicSiteProps {
    r: IPublicSitesRes;
}

const PublicSite: FC<PublicSiteProps> = ({ r: { siteUrl } }) => (
    <Typography color="text.secondary">{siteUrl}</Typography>
);

const getPublicSite = (r: IPublicSitesRes) => <PublicSite key={r.id} r={r} />;

export default getPublicSite;
