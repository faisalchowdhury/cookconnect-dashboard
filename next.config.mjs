// Uploaded media is served by the API under /uploads, so next/image must allow that host.
const api = process.env.NEXT_PUBLIC_API_URL ? new URL(process.env.NEXT_PUBLIC_API_URL) : null;
const apiIsLocal = Boolean(api && ["localhost", "127.0.0.1", "[::1]"].includes(api.hostname));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // The dev server is reached through the Cloudflare tunnel, and Next 16 blocks cross-origin dev requests.
  allowedDevOrigins: ["faisal6001.ssh.bd"],
  images: {
    // Next 16 refuses to optimize images from local addresses, and the dev API is one.
    dangerouslyAllowLocalIP: apiIsLocal,
    // `images.domains` was deprecated and removed in Next 16 in favour of
    // remotePatterns, which is scoped to a protocol and path rather than
    // allowing any URL on the host.
    remotePatterns: [
      ...(api
        ? [
            {
              protocol: api.protocol.replace(":", ""),
              hostname: api.hostname,
              port: api.port,
              pathname: "/uploads/**",
            },
          ]
        : []),
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
      {
        // Banner photography — see src/mock/photos.js.
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
