export interface Page<T> {
    page: number;
    pageSize: number;
    sort: -1 | 0 | 1;
    items: T[];
}
