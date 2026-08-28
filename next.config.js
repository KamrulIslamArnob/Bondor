/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/builder-dashboard",
        permanent: true,
      },
      {
        source: "/seller",
        destination: "/seller-dashboard",
        permanent: true,
      },
      {
        source: "/coursePost",
        destination: "/seller/courses/new",
        permanent: true,
      },
      {
        source: "/productPost",
        destination: "/seller/products/new",
        permanent: true,
      },
      {
        source: "/payment-success",
        destination: "/payment/success",
        permanent: true,
      },
      {
        source: "/payment-cancel",
        destination: "/payment/cancel",
        permanent: true,
      },
      {
        source: "/product-details",
        destination: "/materials",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
