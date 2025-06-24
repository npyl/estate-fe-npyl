interface BlogPostReq {
    id?: number;
    content: string;
}

interface BlogPostRes extends BlogPostReq {
    id: number;
}

export type { BlogPostReq, BlogPostRes };
