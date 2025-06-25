import { useTranslation } from "react-i18next";
import { FC } from "react";
import { ITabRendererProps } from "../types";
import { useGetBlogPostByIdQuery } from "@/services/company";
import { useRouter } from "next/router";
import { toNumberSafe } from "@/utils/toNumber";

const BlogPost: FC<ITabRendererProps> = ({ resourceId }) => {
    const { t } = useTranslation();

    const router = useRouter();
    const { siteId } = router.query;
    const iSiteId = toNumberSafe(siteId);

    const skip = !Boolean(resourceId) || iSiteId === -1;

    const { data } = useGetBlogPostByIdQuery(
        { siteId: iSiteId, postId: resourceId! },
        { skip }
    );

    return data?.title || "";
};

export default BlogPost;
