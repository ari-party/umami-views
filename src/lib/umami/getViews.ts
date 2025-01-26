import ky from 'ky';

export interface XY {
  x: string;
  y: number;
}

export interface PageViews {
  pageviews: XY[];
  sessions: XY[];
}

const oneDay = 24 * 60 * 60 * 1000;

export default async function getViews(
  websiteAPI: string,
  websiteId: string,
  token: string,
): Promise<Array<{ x: Date; y: number }> | null> {
  const now = Date.now();
  const monthAgo = now - 30 * oneDay;

  const response = await ky.get(
    `${websiteAPI}api/websites/${websiteId}/pageviews?${new URLSearchParams({
      startAt: String(monthAgo),
      endAt: String(now),
      unit: 'day',
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
    typeof data !== 'object' ||
    typeof data.pageviews !== 'object' ||
    typeof data.sessions !== 'object'
  )
    return null;

  const pageviews = data.pageviews
    .map((view) => ({
      x: new Date(view.x),
      y: view.y,
    }))
    .sort((a, b) => b.x.getTime() - a.x.getTime());

  // ignore the last day
  return pageviews.slice(1);
}
