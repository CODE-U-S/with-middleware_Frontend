// types.ts
export interface User {
    id: number;
    createdDate?: string | null;
    modifiedDate?: string | null;
    name?: string | null;
    email?: string | null;
    category?: string | null;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    user: {
        id: number;
    };
    category: string | null;
    field: string | null;
}

