 (function () {
    console.log('[IKEA UAT APP TEST] GTM tag loaded');

    if (!/Android/i.test(navigator.userAgent)) {
      console.log('[IKEA UAT APP TEST] Not Android');
      return;
    }

    var currentUrl = window.location.href;
    var pageUrl = new URL(currentUrl);

    var targetUrl = currentUrl;
    var intentUrl =
      targetUrl.replace(/^https:\/\//, 'intent://') +
      '#Intent;' +
      'scheme=https;' +
      'package=com.example.skateboard;' +
      'S.browser_fallback_url=' +
      encodeURIComponent(targetUrl) +
      ';end';

    window.location.href = intentUrl;
  })();
