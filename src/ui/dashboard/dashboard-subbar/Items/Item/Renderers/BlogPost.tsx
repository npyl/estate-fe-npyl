import { FC } from "react";
import { ITabRendererProps } from "../types";
import { useGetBlogPostByIdQuery } from "@/services/blog";
import isFalsy from "@/utils/isFalsy";

const BlogPost: FC<ITabRendererProps> = ({ resourceId }) => {
    const skip = isFalsy(resourceId);
    const { data } = useGetBlogPostByIdQuery(resourceId!, { skip });
    return "TEMP";
};

export default BlogPost;
