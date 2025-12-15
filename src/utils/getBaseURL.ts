export default function getBaseURL(input: string): string {
  const url = new URL(input);

  // If URL path starts with '/analytics/[country]', keep that, else set to '/'
  const pathMatch = url.pathname.match(/^\/analytics\/[a-zA-Z]{2}(\/|$)/);
  url.pathname = pathMatch ? `/analytics/${url.pathname.split('/')[2]}/` : '/';

  return url.toString();
}
