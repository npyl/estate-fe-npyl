import { FC } from "react";
import { ITabRendererProps } from "../types";
import { useGetBlogPostByIdQuery } from "@/services/blog";

const BlogPost: FC<ITabRendererProps> = ({ resourceId }) => {
    const skip = !Boolean(resourceId);
    const { data } = useGetBlogPostByIdQuery(resourceId!, { skip });
    return data?.title || "";
};

export default BlogPost;
