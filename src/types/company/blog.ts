interface BlogPostReq {
    id?: number;
    title: string;
    content: string;
}

interface BlogPostRes extends BlogPostReq {
    id: number;
}

export type { BlogPostReq, BlogPostRes };
