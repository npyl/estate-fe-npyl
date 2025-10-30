import { FC } from "react";
import { ITabRendererProps } from "../types";
import { useGetBlogPostByIdQuery } from "@/services/blog";
import isFalsy from "@/utils/isFalsy";
import { useTranslation } from "react-i18next";
import { getTitleSafe } from "@/types/description";

const BlogPost: FC<ITabRendererProps> = ({ resourceId }) => {
    const { i18n } = useTranslation();
    const skip = isFalsy(resourceId);
    const { data } = useGetBlogPostByIdQuery(resourceId!, { skip });
    return getTitleSafe(i18n.language, data?.descriptions);
};

export default BlogPost;
