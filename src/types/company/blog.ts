interface BlogPostReq {
    id?: number;
    title: string;
    content: string;
}

interface BlogPostRes extends BlogPostReq {
    id: number;
}

interface BlogFilters {
    search: string;
}

export type { BlogPostReq, BlogPostRes, BlogFilters };
