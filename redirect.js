(function () {
  if (!/Android/i.test(navigator.userAgent)) return;

  var PACKAGE = 'com.example.skateboard';
  var FLAG = 'no_app_redirect';
  var url = new URL(window.location.href);

  if (url.searchParams.get(FLAG) === '1') return;

  var fallback = new URL(url.toString());
  fallback.searchParams.set(FLAG, '1');

  var intentUrl =
    url.toString().replace(/^https:\/\//, 'intent://') +
    '#Intent;scheme=https;package=' + PACKAGE +
    ';S.browser_fallback_url=' + encodeURIComponent(fallback.toString()) + ';end';

  function go() { window.location.href = intentUrl; }

  if (document.readyState === 'complete') setTimeout(go, 300);
  else window.addEventListener('load', function () { setTimeout(go, 300); });
})();
