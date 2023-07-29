export interface HeaderListType {
    id: number;
    title: string;
    children: ChildHeaderType[];
}

export interface ChildHeaderType {
    id: number;
    title: string;
}
