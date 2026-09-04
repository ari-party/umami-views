export default function getShareToken(shareURL: string): string | null {
  const segments = new URL(shareURL).pathname.split('/').filter(Boolean);

  // https://domain.tld/[analytics/[country]/]share/[token][/domain.tld]
  const index = segments.indexOf('share');

  return index === -1 ? null : (segments[index + 1] ?? null);
}
