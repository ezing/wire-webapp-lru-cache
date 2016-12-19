var LRUCache = require('./commonjs/LRUCache');

Promise.resolve()
  .then(function() {
    var cache = new LRUCache(3);
    cache.set('1', 'Apple');
    cache.set('2', 'Orange');
    cache.set('3', 'Tomato');
    cache.delete('2');
    console.log(cache.size()); // 2
    process.exit(0);
  })
  .catch(function() {
    process.exit(1);
  });
