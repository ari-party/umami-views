export default function getShareToken(shareURL: string): string | null {
  const segments = shareURL.split('/');

  // Case 1: https://domain.tld/share/[token]/[domain.tld]
  if (segments.length >= 5 && segments[segments.length - 3] === 'share')
    return segments[segments.length - 2];

  // Case 2: https://domain.tld/analytics/[country]/share/[token]
  if (
    segments.length >= 7 &&
    segments[segments.length - 4] === 'analytics' &&
    /^[a-zA-Z]{2}$/.test(segments[segments.length - 3]) &&
    segments[segments.length - 2] === 'share'
  )
    return segments[segments.length - 1];

  return null;
}
