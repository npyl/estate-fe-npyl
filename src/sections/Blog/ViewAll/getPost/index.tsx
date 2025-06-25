import Link from "@/components/Link";
import getBorderColor from "@/theme/borderColor";
import { BlogPostRes } from "@/types/company";
import { SxProps, Theme } from "@mui/material";
import { FC } from "react";
import RemoveOpener from "./RemoveOpener";

const PostSx: SxProps<Theme> = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    bgcolor: "background.paper",
    p: 1,
    borderRadius: 1,
    boxShadow: 5,
    border: "1px solid",
    borderColor: getBorderColor,
};

interface PostProps {
    siteId: number;
    p: BlogPostRes;
}

const Post: FC<PostProps> = ({ siteId, p }) => (
    <Link href={`/blog/${siteId}/${p.id}`} sx={PostSx}>
        {p.title}
        <RemoveOpener siteId={siteId} postId={p.id} />
    </Link>
);

const getPost = (siteId: number) => (p: BlogPostRes) => (
    <Post key={p.id} siteId={siteId} p={p} />
);

export default getPost;
