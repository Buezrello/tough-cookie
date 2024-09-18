'use strict';
const vows = require('vows');
const assert = require('assert');
const tough = require('../lib/cookie');
const Cookie = tough.Cookie;

vows.describe('Cookie Prefix Tests').addBatch({
  '__Secure- cookies': {
    topic: function() {
      const cookie = new Cookie({
        key: '__Secure-sessionId',
        value: 'abc123',
        secure: true  // Must have the Secure attribute
      });
      return cookie;
    },
    'it should validate if Secure is set': function(cookie) {
      assert.isTrue(cookie.validate());
    },
    'it should invalidate if Secure is not set': function(cookie) {
      cookie.secure = false;  // Remove the Secure attribute
      assert.isFalse(cookie.validate());
    }
  },
  '__Host- cookies': {
    topic: function() {
      const cookie = new Cookie({
        key: '__Host-sessionId',
        value: 'abc123',
        secure: true,  // Must have the Secure attribute
        path: '/'  // Must have the Path=/
      });
      return cookie;
    },
    'it should validate if Secure, Path=/, and no Domain are set': function(cookie) {
      assert.isTrue(cookie.validate());
    },
    'it should invalidate if Secure is not set': function(cookie) {
      cookie.secure = false;  // Remove the Secure attribute
      assert.isFalse(cookie.validate());
    },
    'it should invalidate if Path is not set to /': function(cookie) {
      cookie.path = '/somepath';  // Set an invalid path
      assert.isFalse(cookie.validate());
    },
    'it should invalidate if Domain is set': function(cookie) {
      cookie.domain = 'example.com';  // Set an invalid domain
      assert.isFalse(cookie.validate());
    }
  }
}).export(module);
