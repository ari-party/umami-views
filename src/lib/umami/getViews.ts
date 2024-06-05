import ky from 'ky';

import getNearestMidnight from '../../utils/getNearestMidnight';

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
): Promise<PageViews | null> {
  const today = getNearestMidnight();

  const monthAgo = today - 30 * oneDay;

  const response = await ky.get(
    `${websiteAPI}api/websites/${websiteId}/pageviews?${new URLSearchParams({
      startAt: String(monthAgo),
      endAt: String(today - oneDay),
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
    typeof data === 'object' &&
    typeof data.pageviews === 'object' &&
    typeof data.sessions === 'object'
  )
    return data;

  return null;
}
