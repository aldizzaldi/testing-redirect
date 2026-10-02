(function () {
  if (!/Android/i.test(navigator.userAgent)) return;

  var PACKAGE = 'id.co.ikea.android.uat';
  var FLAG = 'no_app_redirect';
  var REDIRECT_KEY = 'ikea_app_redirect';
  var TTL = 10 * 60 * 1000;

  var current = new URL(window.location.href);

  if (current.searchParams.get(FLAG) === '1') {
    return;
  }

  var storageKey = REDIRECT_KEY + ':' + current.pathname;

  try {
    var lastAttempt = parseInt(
      sessionStorage.getItem(storageKey) || '0',
      10
    );

    if (lastAttempt && (Date.now() - lastAttempt) < TTL) {
      return;
    }

    sessionStorage.setItem(
      storageKey,
      String(Date.now())
    );
  } catch (e) {}

  var fallback = new URL(current.href);
  fallback.searchParams.set(FLAG, '1');

  var target = new URL(current.href);
  target.searchParams.delete(FLAG);
  target.hash = '';

  var intentUrl =
    'intent://' +
    target.host +
    target.pathname +
    target.search +
    '#Intent;' +
    'scheme=https;' +
    'package=' + PACKAGE + ';' +
    'S.browser_fallback_url=' +
    encodeURIComponent(fallback.href) +
    ';end';

  function openApp() {
    if (document.visibilityState !== 'visible') return;
    window.location.replace(intentUrl);
  }

  if (document.readyState === 'complete') {
    setTimeout(openApp, 300);
  } else {
    window.addEventListener(
      'load',
      function () {
        setTimeout(openApp, 300);
      },
      { once: true }
    );
  }
})();
