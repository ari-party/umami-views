import ky from 'ky';

export interface XY {
  x: string;
  y: number;
}

export interface PageViews {
  pageviews: XY[];
  sessions: XY[];
}

export default async function getViews(
  websiteAPI: string,
  websiteId: string,
  token: string,
): Promise<PageViews | null> {
  const now = Date.now();
  const monthAgo = now - 30 * 24 * 60 * 60 * 1000;

  const response = await ky.get(
    `${websiteAPI}api/websites/${websiteId}/pageviews?${new URLSearchParams({
      startAt: String(monthAgo),
      endAt: String(now),
      unit: 'day',
      offset: String(0),
      timezone: 'Europe/Amsterdam',
    })}`,
    {
      headers: {
        'x-umami-share-token': token,
      },
    },
  );
  if (!response.ok) return null;

  const data = (await response.json()) as PageViews;

  if (
    typeof data === 'object' &&
    typeof data.pageviews === 'object' &&
    typeof data.sessions === 'object'
  )
    return data;

  return null;
}
