import { FC } from "react";
import Content from "./Content";
import Form from "./Form";
import { useGetBlogPostByIdQuery } from "@/services/blog";
import Actions from "./Actions";
import isFalsy from "@/utils/isFalsy";

interface Props {
    postId?: number;
}

const BlogViewByPublicId: FC<Props> = ({ postId }) => {
    const { data } = useGetBlogPostByIdQuery(postId!, {
        skip: isFalsy(postId),
    });
    return (
        <Form data={data}>
            <Content postId={postId} image={data?.thumbnail} />
            <Actions />
        </Form>
    );
};

export default BlogViewByPublicId;
