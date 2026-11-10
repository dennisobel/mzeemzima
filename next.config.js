/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Google profile pictures, shown for users who sign in with Google.
    remotePatterns: [{ protocol: "https", hostname: "lh3.googleusercontent.com" }],
  },
};

module.exports = nextConfig;
