import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    // Force le root en forward slashes pour éviter le panic Turbopack sur Windows
    root: path.resolve(__dirname).replace(/\\/g, "/"),
  },
};

export default nextConfig;
