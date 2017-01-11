declare class LRUCache {
    private capacity;
    private map;
    private head;
    private end;
    constructor(capacity?: number);
    delete(key: string): boolean;
    get(key: string): any;
    keys(): Array<string>;
    latest(): any;
    oldest(): any;
    private remove(node);
    set(key: string, value: any): Object;
    private setHead(node);
    size(): number;
    toString(): string;
}
export = LRUCache;
