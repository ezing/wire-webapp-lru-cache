"use strict";
var Node = (function () {
    function Node(key, value) {
        this.key = key;
        this.value = value;
    }
    return Node;
}());
exports.Node = Node;
var LRUCache = (function () {
    function LRUCache(capacity) {
        this.capacity = capacity;
        this.map = {};
    }
    LRUCache.prototype.set = function (key, value) {
        var old = this.map[key];
        var removedNode = undefined;
        if (old) {
            old.value = value;
            removedNode = this.remove(old);
            this.setHead(old);
            return removedNode;
        }
        else {
            var created = new Node(key, value);
            if (Object.keys(this.map).length >= this.capacity) {
                delete this.map[this.end.key];
                removedNode = this.remove(this.end);
                this.setHead(created);
            }
            else {
                this.setHead(created);
            }
            this.map[key] = created;
            return removedNode;
        }
    };
    LRUCache.prototype.get = function (key) {
        var node = this.map[key];
        if (node) {
            this.remove(node);
            this.setHead(node);
            return node.value;
        }
    };
    LRUCache.prototype.delete = function (key) {
        var node = this.map[key];
        if (node) {
            this.remove(node);
            delete this.map[node.key];
            return true;
        }
        else {
            return false;
        }
    };
    LRUCache.prototype.latest = function () {
        return this.head;
    };
    LRUCache.prototype.oldest = function () {
        return this.end;
    };
    LRUCache.prototype.size = function () {
        return Object.keys(this.map).length;
    };
    LRUCache.prototype.keys = function () {
        var keys = [];
        var entry = this.head;
        while (entry) {
            keys.push(entry.key);
            entry = entry.next;
        }
        return keys;
    };
    LRUCache.prototype.toString = function () {
        var string = '(newest) ';
        var entry = this.head;
        while (entry) {
            string += String(entry.key) + ":" + entry.value;
            entry = entry.next;
            if (entry) {
                string += ' > ';
            }
        }
        return string + " (oldest)";
    };
    LRUCache.prototype.remove = function (node) {
        if (node.previous) {
            node.previous.next = node.next;
        }
        else {
            this.head = node.next;
        }
        if (node.next != null) {
            node.next.previous = node.previous;
        }
        else {
            this.end = node.previous;
        }
        return node;
    };
    LRUCache.prototype.setHead = function (node) {
        node.next = this.head;
        node.previous = null;
        if (this.head) {
            this.head.previous = node;
        }
        this.head = node;
        if (!this.end) {
            this.end = this.head;
        }
    };
    return LRUCache;
}());
exports.LRUCache = LRUCache;
