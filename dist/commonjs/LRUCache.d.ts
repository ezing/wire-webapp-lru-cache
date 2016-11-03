declare class LRUCache {
    private capacity;
    private map;
    private head;
    private end;
    constructor(capacity: number);
    set(key: number | string, value: any): any;
    get(key: number | string): any;
    delete(key: number | string): boolean;
    size(): number;
    keys(): Array<number | string>;
    toString(): string;
    private remove(node);
    private setHead(node);
}
export = LRUCache;
