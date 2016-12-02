export declare class Node {
    previous: Node;
    next: Node;
    key: number | string;
    value: any;
    constructor(key: number | string, value: any);
}
export declare class LRUCache {
    private capacity;
    private map;
    private head;
    private end;
    constructor(capacity: number);
    set(key: number | string, value: any): Node | undefined;
    get(key: number | string): any;
    delete(key: number | string): boolean;
    latest(): Node;
    oldest(): Node;
    size(): number;
    keys(): Array<number | string>;
    toString(): string;
    private remove(node);
    private setHead(node);
}
