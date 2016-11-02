//
// Wire
// Copyright (C) 2016 Wire Swiss GmbH
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see http://www.gnu.org/licenses/.
//

class Node {
  public previous: Node;
  public next: Node;
  public key: number|string;
  public value: any;

  constructor(key: number|string, value: any) {
    this.key = key;
    this.value = value;
  }
}

class LRUCache {
  private map: Object;
  private head: Node;
  private end: Node;

  constructor(private capacity: number) {
    this.map = {};
  }

  public set(key: number|string, value: any): any {
    let old: Node = (<any> this.map)[key];
    let removedNode: Node;

    if (old) {
      old.value = value;
      removedNode = this.remove(old);
      this.setHead(old);
    } else {
      let created: Node = new Node(key, value);

      if (Object.keys(this.map).length >= this.capacity) {
        delete (<any> this.map)[this.end.key];
        removedNode = this.remove(this.end);
        this.setHead(created);
      } else {
        this.setHead(created);
      }

      (<any> this.map)[key] = created;
      return removedNode;
    }
  }

  public get(key: number|string): any {
    let node: Node = (<any> this.map)[key];
    if (node) {
      this.remove(node);
      this.setHead(node);
      return node.value;
    }
  }

  public delete(key: number|string): boolean {
    let node: Node = (<any> this.map)[key];

    if (node) {
      this.remove(node);
      delete (<any> this.map)[node.key];
      return true;
    } else {
      return false;
    }
  }

  public size(): number {
    return Object.keys(this.map).length;
  }

  public keys(): Array<number|string> {
    let keys: Array<number|string> = [];
    let entry: Node = this.head;

    while (entry) {
      keys.push(entry.key);
      entry = entry.next;
    }

    return keys;
  }

  public toString(): string {
    let string: string = '(newest) ';
    let entry: Node = this.head;

    while (entry) {
      string += `${String(entry.key)}:${entry.value}`;
      entry = entry.next;
      if (entry) {
        string += ' > ';
      }
    }

    return `${string} (oldest)`;
  }

  private remove(node: Node): Node {
    if (node.previous) {
      node.previous.next = node.next;
    } else {
      this.head = node.next;
    }

    if (node.next != null) {
      node.next.previous = node.previous;
    } else {
      this.end = node.previous;
    }

    return node;
  }

  private setHead(node: Node) {
    node.next = this.head;
    node.previous = null;

    if (this.head) {
      this.head.previous = node;
    }

    this.head = node;

    if (!this.end) {
      this.end = this.head;
    }
  }
}

export = LRUCache;
