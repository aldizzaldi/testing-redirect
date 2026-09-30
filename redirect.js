(function () {
  if (!/Android/i.test(navigator.userAgent)) return;

  var PACKAGE = 'com.example.skateboard';
  var FLAG = 'no_app_redirect';
  var url = new URL(window.location.href);

  // Sudah balik dari fallback -> jangan redirect lagi
  if (url.searchParams.get(FLAG) === '1') return;

  var fallback = new URL(url.toString());
  fallback.searchParams.set(FLAG, '1');

  window.location.href =
    url.toString().replace(/^https:\/\//, 'intent://') +
    '#Intent;scheme=https;package=' + PACKAGE +
    ';S.browser_fallback_url=' + encodeURIComponent(fallback.toString()) + ';end';
})();
