export default function getShareToken(shareURL: string): string | null {
  const segments = shareURL.split('/');
  // https://domain.tld/share/token/domain.tld
  if (segments[segments.length - 3] !== 'share') return null;
  return segments[segments.length - 2];
}
