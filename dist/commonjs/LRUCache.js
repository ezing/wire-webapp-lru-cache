"use strict";
var LRUCache = (function () {
    function LRUCache(capacity) {
        if (capacity === void 0) { capacity = 100; }
        this.capacity = capacity;
        this.map = {};
    }
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
    LRUCache.prototype.get = function (key) {
        var node = this.map[key];
        if (node) {
            this.remove(node);
            this.setHead(node);
            return node.value;
        }
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
    LRUCache.prototype.latest = function () {
        return this.head.value;
    };
    LRUCache.prototype.oldest = function () {
        return this.end.value;
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
    LRUCache.prototype.set = function (key, value) {
        var old = this.map[key];
        var removedNode = {
            key: undefined,
            value: undefined
        };
        if (old) {
            old.value = value;
            removedNode = this.remove(old);
            this.setHead(old);
            return removedNode.value;
        }
        else {
            var created = {
                key: key,
                value: value
            };
            if (Object.keys(this.map).length >= this.capacity) {
                delete this.map[this.end.key];
                removedNode = this.remove(this.end);
                this.setHead(created);
            }
            else {
                this.setHead(created);
            }
            this.map[key] = created;
            return removedNode.value;
        }
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
    LRUCache.prototype.size = function () {
        return Object.keys(this.map).length;
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
    return LRUCache;
}());
module.exports = LRUCache;
