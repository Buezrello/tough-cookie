'use strict';
const vows = require('vows');
const assert = require('assert');
const tough = require('../lib/cookie');
const Cookie = tough.Cookie;
const CookieJar = tough.CookieJar;

vows.describe('SameSite Cookie Tests').addBatch({
  'When creating a SameSite=strict cookie': {
    topic: function() {
      const cookie = new Cookie({
        key: 'sessionId',
        value: 'abc123',
        sameSite: 'strict'
      });
      const jar = new CookieJar();
      try {
        jar.setCookie(cookie, 'https://example.com', { sameSiteContext: 'strict' }, this.callback);
      } catch (err) {
        this.callback(err); // Pass error to callback
      }
    },
    'it should set without errors': function(err) {
      assert.isNull(err);
    }
  },
  'When creating a SameSite=none cookie in lax context': {
    topic: function() {
      const cookie = new Cookie({
        key: 'sessionId',
        value: 'abc123',
        sameSite: 'none'
      });
      const jar = new CookieJar();
      try {
        jar.setCookie(cookie, 'https://example.com', { sameSiteContext: 'lax' }, this.callback);
      } catch (err) {
        this.callback(err); // Pass error to callback
      }
    },
    'it should set without errors': function(err) {
      assert.isNull(err);
    }
  }
}).export(module);
