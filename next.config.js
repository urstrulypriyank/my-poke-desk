/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.pokemondb.net",
        port: "",
        pathname: "/artwork/**",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/pokemon",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
