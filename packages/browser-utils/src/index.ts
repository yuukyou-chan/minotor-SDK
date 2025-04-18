export function getBrowserInfo() {
  return {
    userAgent: navigator.userAgent,
    language: navigator.language,
    platform: navigator.platform,
    referrer: document.referrer,
    path: location.pathname,
  };
}
