/*
    Returns the base url with scheme and trailing slash
 */
export default function getBaseURL(input: string): string {
  const url = new URL(input);
  url.pathname = '/';
  return url.toString();
}
