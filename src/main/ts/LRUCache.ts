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

  constructor(public key: number, public value: any) {
  }
}

class LRUCache {
  private map: Object;
  private head: Node;
  private end: Node;

  constructor(private capacity: number) {
    this.map = {};
  }

  public set(key: number, value: any) {
    if (this.map[key]) {
      let old: Node = this.map[key];
      old.value = value;
      this.remove(old);
      this.setHead(old);
    } else {
      let created: Node = new Node(key, value);
      if (Object.keys(this.map).length >= this.capacity) {
        delete this.map[this.end.key];
        this.remove(this.end);
        this.setHead(created);
      } else {
        this.setHead(created);
      }

      this.map[key] = created;
    }
  }

  public get(key: number): any {
    if (this.map[key]) {
      let node: Node = this.map[key];
      this.remove(node);
      this.setHead(node);
      return node.value;
    }
  }

  public size(): number {
    return Object.keys(this.map).length;
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

  private remove(node: Node) {

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
