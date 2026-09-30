// Sama dengan tag GTM. Nanti di production cukup pindahkan ke GTM.
(function () {
  var PACKAGE = 'com.example.skateboard';
  var FLAG = 'no_app_redirect';
  var KEY = 'ikea_app_redirect_tried';

  console.log('[APP TEST] loaded');
  if (!/Android/i.test(navigator.userAgent)) { console.log('[APP TEST] bukan Android'); return; }

  var url = new URL(location.href);
  if (url.searchParams.get(FLAG) === '1') { console.log('[APP TEST] balik dari fallback'); return; }

  try {
    if (sessionStorage.getItem(KEY)) { console.log('[APP TEST] sudah dicoba di sesi ini'); return; }
    sessionStorage.setItem(KEY, '1');
  } catch (e) {}

  var fallback = new URL(url.toString());
  fallback.searchParams.set(FLAG, '1');

  location.replace(
    url.toString().replace(/^https:\/\//, 'intent://') +
    '#Intent;scheme=https;package=' + PACKAGE +
    ';S.browser_fallback_url=' + encodeURIComponent(fallback.toString()) + ';end'
  );
})();
