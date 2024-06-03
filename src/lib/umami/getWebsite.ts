import ky from 'ky';

export interface Website {
  id: string;
  name: string;
  domain: string;
  shareId: string | null;
  resetAt: string | null;
  userId: string | null;
  teamId: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}

export default async function getWebsite(
  websiteAPI: string,
  websiteId: string,
  token: string,
): Promise<Website | null> {
  const response = await ky.get(`${websiteAPI}api/websites/${websiteId}`, {
    headers: {
      'x-umami-share-token': token,
    },
  });
  if (!response.ok) return null;

  const data = (await response.json()) as Website;

  if (typeof data === 'object') return data;

  return null;
}
