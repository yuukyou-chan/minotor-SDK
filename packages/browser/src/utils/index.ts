export function getBrowserInfo() {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    referrer: document.referrer,
    path: location.pathname,
  };
}
