import ky from 'ky';

export interface TokenResponse {
  websiteId: string;
  token: string;
}

export default async function getToken(
  websiteAPI: string,
  shareId: string,
): Promise<TokenResponse | null> {
  const response = await ky.get(`${websiteAPI}api/share/${shareId}`);
  if (!response.ok) return null;

  const data = (await response.json()) as TokenResponse;

  if (
    typeof data === 'object' &&
    typeof data.token === 'string' &&
    typeof data.websiteId === 'string'
  )
    return data;

  return null;
}
