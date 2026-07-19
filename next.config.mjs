/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  serverExternalPackages: ["@libsql/client", "@prisma/adapter-libsql", "libsql"]
};

export default nextConfig;
