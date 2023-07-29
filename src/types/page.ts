export default interface IPage<T> {
    content: T[];
    pageNumber: number;
    last: boolean;
    first: boolean;
    totalElements: number;
    totalPages: number;
    offset: number;
}
