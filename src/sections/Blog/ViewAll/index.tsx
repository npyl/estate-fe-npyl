// import { useGetBlogPostsQuery } from "@/services/company";
import Stack from "@mui/material/Stack";
import { FC } from "react";
import getPost from "./getPost";
import { BlogPostRes } from "@/types/company";

const FAKE_DATA: BlogPostRes[] = [
    { id: 1, title: "Some post #1", content: "" },
];

interface Props {
    siteId: number;
}

const ViewAllPosts: FC<Props> = ({ siteId }) => {
    // const { data } = useGetBlogPostsQuery(siteId);
    return <Stack spacing={1}>{FAKE_DATA?.map(getPost(siteId))}</Stack>;
};

export default ViewAllPosts;
