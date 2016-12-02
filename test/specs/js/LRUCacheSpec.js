/*
 * Wire
 * Copyright (C) 2016 Wire Swiss GmbH
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses/.
 *
 */

describe('LRUCache', function() {

  var LRUCache = require('../../../dist/commonjs/LRUCache.js').LRUCache;

  describe('delete', function() {
    it('keeps the list order intact when deleting', function() {
      var cache = new LRUCache(3);
      cache.set('Apple', 1);
      cache.set('Orange', 2);
      cache.set('Tomato', 3);
      cache.delete('Orange');
      expect(cache.size()).toBe(2);
      expect(cache.keys()).toEqual(['Tomato', 'Apple']);
    });

    it('deletes an item and continues with normal operation', function() {
      var cache = new LRUCache(3);
      cache.set('Apple', 1);
      cache.set('Orange', 2);
      cache.set('Tomato', 3);
      var success = cache.delete('Apple');
      expect(success).toBe(true);
      expect(cache.size()).toBe(2);
      cache.set('Plum', 4);
      expect(cache.size()).toBe(3);
      cache.set('Banana', 5);
      expect(cache.size()).toBe(3);
    });
  });

  describe('oldest', function() {
    it('returns the item which was added first', function() {
      var cache = new LRUCache(3);
      cache.set('Apple', 1);
      cache.set('Orange', 2);
      cache.set('Tomato', 3);
      expect(cache.oldest().key).toBe('Apple');
    });
  });

  describe('keys', function() {
    it('lists all keys of the cache starting with the latest item in the cache', function() {
      var cache = new LRUCache(3);
      cache.set('Apple', 1);
      cache.set('Orange', 2);
      cache.set('Tomato', 3);
      expect(cache.keys()).toEqual(['Tomato', 'Orange', 'Apple']);
    });
  });

  describe('latest', function() {
    it('returns the item which was added last', function() {
      var cache = new LRUCache(3);
      cache.set('Apple', 1);
      cache.set('Orange', 2);
      cache.set('Tomato', 3);
      expect(cache.latest().key).toBe('Tomato');
    });
  });

  describe('set', function() {
    it('removes the oldest element if no space available', function() {
      var cache = new LRUCache(3);
      cache.set('Apple', 1);
      cache.set('Orange', 2);
      cache.set('Tomato', 3);
      cache.get('Apple');
      cache.set('Plum', 4);
      expect(cache.size()).toBe(3);
      expect(cache.keys()).toEqual(['Plum', 'Apple', 'Tomato']);
    });

    it('returns the removed node if no space available', function() {
      var cache = new LRUCache(3);
      cache.set('Apple', 1);
      cache.set('Orange', 2);
      cache.set('Tomato', 3);
      var removedNode = cache.set('Plum', 4);
      expect(removedNode.key).toBe('Apple');
    });
  });

});
