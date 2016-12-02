# Wire

This repository is part of the source code of Wire. You can find more information at [wire.com](https://wire.com) or by contacting opensource@wire.com.

You can find the published source code at [github.com/wireapp](https://github.com/wireapp).

For licensing information, see the attached LICENSE file and the list of third-party licenses at [wire.com/legal/licenses/](https://wire.com/legal/licenses/).

## Build Status

[![Build Status](https://travis-ci.org/wireapp/wire-webapp-lru-cache.svg?branch=master)](https://travis-ci.org/wireapp/wire-webapp-lru-cache)

## Instructions

### Installation

```bash
npm install --save wire-webapp-lru-cache
```

### Usage

**TypeScript**

```typescript
import LRUCache from "wire-webapp-lru-cache";
let cache: LRUCache = new LRUCache(3);
```

**JavaScript**

```javascript
var cache = require('wire-webapp-lru-cache');
var LRUCache = cache.LRUCache;

// "set"
var cache = new LRUCache(2);
cache.set('First', 1);
cache.set('Second', 2);
cache.set('Third', 3);

// "size"
var size = cache.size();
console.log(size); // 2

// "keys"
var keys = cache.keys();
console.log(keys); // ['Third', 'Second']

// "delete"
var isDeleted = cache.delete('Third');
console.log(isDeleted); // true
console.log(cache.size()); // 1
console.log(cache.keys()); // ['Second']

// behaviour of "set" (returns deleted node)
cache.set('Fourth', 4);
console.log(cache.size()); // 2
var deleted = cache.set('Fifth', 5);
console.log(deleted.key); // ['Second']
console.log(cache.keys()); // ['Fifth', 'Fourth']

// "get" (saves a Node from cache limit)
var value = cache.get('Fourth');
console.log(value); // 4
cache.set('Sixth', 6);
console.log(cache.keys()); // ['Sixth', 'Fourth']

// "latest" (get Node which was added last)
console.log(cache.latest().key); // 'Sixth'

// "oldest" (get Node which was added first)
console.log(cache.oldest().key); // 'Fourth'
```
