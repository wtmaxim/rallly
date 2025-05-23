const port = process.env.PORT || 3000;

const getVercelUrl = () => {
  return process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : null;
};

function joinPath(baseUrl: string, subpath = "") {
  if (subpath) {
    const url = new URL(subpath, baseUrl);
    return url.href;
  }

  return baseUrl;
}

export function absoluteUrl(subpath = "", query: Record<string, string> = {}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ??
    getVercelUrl() ??
    `http://localhost:${port}`;

  const url = new URL(subpath, baseUrl);

  // biome-ignore lint/complexity/noForEach: Fix this later
  Object.entries(query).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const urlString = url.href;

  return urlString.endsWith("/") ? urlString.slice(0, -1) : urlString;
}

export function shortUrl(subpath = "") {
  const baseUrl = process.env.NEXT_PUBLIC_SHORT_BASE_URL ?? absoluteUrl();
  return joinPath(baseUrl, subpath);
}
