declare class LRUCache {
    private capacity;
    private map;
    private head;
    private end;
    constructor(capacity?: number);
    set(key: string, value: any): Object;
    get(key: string): any;
    delete(key: string): boolean;
    latest(): any;
    oldest(): any;
    size(): number;
    keys(): Array<string>;
    toString(): string;
    private remove(node);
    private setHead(node);
}
export = LRUCache;
