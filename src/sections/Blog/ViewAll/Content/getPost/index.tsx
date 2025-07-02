import { BlogPostShort } from "@/types/company";
import RemoveOpener from "./RemoveOpener";
import BlogPostCard from "@/ui/Cards/BlogPost";

const getPost = (p: BlogPostShort) => (
    <BlogPostCard key={p.id} item={p}>
        <RemoveOpener postId={p.id} />
    </BlogPostCard>
);

export default getPost;
