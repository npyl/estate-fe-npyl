import Breadcrumbs from "@mui/material/Breadcrumbs";
import { FC, PropsWithChildren } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link, { LinkProps } from "@/components/Link";
import { useRouter } from "next/router";
import { toNumberSafe } from "@/utils/toNumber";
import {
    useGetBlogPostByIdQuery,
    useGetPublicSitesQuery,
} from "@/services/company";
import Skeleton from "@mui/material/Skeleton";
import PublicLogo from "@/assets/logo/Public";
import { Box, SxProps, Theme } from "@mui/material";
import { useTranslation } from "react-i18next";

interface SiteCrumbProps extends Omit<LinkProps, "href" | "children"> {
    siteId: number;
}

const SiteCrumb: FC<SiteCrumbProps> = ({ siteId, ...props }) => {
    const { data, isLoading } = useGetPublicSitesQuery();
    const siteUrl = data?.find(({ id }) => id === siteId)?.siteUrl || "";
    return (
        <Link href={`/blog/${siteId}`} {...props}>
            {isLoading ? <Skeleton width="50px" height="38px" /> : null}
            {siteUrl}
        </Link>
    );
};

interface PostCrumbProps extends Omit<LinkProps, "href" | "children"> {
    siteId: number;
    postId: number;
}
const PostCrumb: FC<PostCrumbProps> = ({ siteId, postId, ...props }) => {
    const { t } = useTranslation();
    const { data, isLoading } = useGetBlogPostByIdQuery({ siteId, postId });
    const title = data?.title || (isLoading ? "" : t("New_Neutral"));
    return (
        <Link href={`/blog/${siteId}/${postId}`} {...props}>
            {isLoading ? <Skeleton width="50px" height="38px" /> : null}
            {title}
        </Link>
    );
};

const AllCrumbSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 0.5,
};

const AllCrumb: FC<Omit<LinkProps, "href" | "children">> = ({
    sx,
    ...props
}) => {
    const { t } = useTranslation();
    return (
        <Link href="/blog" sx={{ ...AllCrumbSx, ...sx }} {...props}>
            <PublicLogo />
            {t("All")}
        </Link>
    );
};

const DynamicCrumbs = () => {
    const router = useRouter();
    const { siteId, postId } = router.query;
    const iSiteId = toNumberSafe(siteId);
    const iPostId = toNumberSafe(postId);

    const is0 = iSiteId !== -1;
    const is1 = is0 && iPostId !== -1;

    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            <AllCrumb />
            {is0 ? <SiteCrumb siteId={iSiteId} /> : null}
            {is1 ? <PostCrumb siteId={iSiteId} postId={iPostId} /> : null}
        </Breadcrumbs>
    );
};

const BreadcrumbsLayout: FC<PropsWithChildren> = ({ children }) => (
    <>
        <Box mt={0.5} />
        <DynamicCrumbs />
        <Box mt={0.5} />
        {children}
    </>
);

export default BreadcrumbsLayout;
