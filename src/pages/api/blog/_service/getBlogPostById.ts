import debugLog from "@/_private/debugLog";
import { BlogPostRes } from "@/types/company";

const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/blog`;

const getBlogPostById = async (Authorization: string, postId: number) => {
    try {
        const res = await fetch(`${baseUrl}/${postId}`, {
            headers: { Authorization, "Content-Type": "application/json" },
        });
        if (!res.ok) throw await res.json();
        return (await res.json()) as BlogPostRes;
    } catch (ex) {
        debugLog(ex);
    }
};

export default getBlogPostById;
