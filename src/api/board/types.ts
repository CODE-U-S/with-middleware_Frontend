// types.ts
export interface User {
    id: number;
    createdDate?: string | null;
    modifiedDate?: string | null;
    name: string | null;
    email?: string | null;
    category?: string | null;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    user: User;
    createdDate?: string | null;
    modifiedDate?: string | null;
    category: string | null;
    field: string | null;
    status: "OPEN" | "CLOSED";
}

export interface Like {
    id: number;
    user: User;
    post: Post;
    createdDate?: string | null;
    modifiedDate?: string | null;
}
