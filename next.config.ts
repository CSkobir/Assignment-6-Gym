import type { NextConfig } from "next";
//https://img.magnific.com/free-photo/portrait-anime-character-doing-fitness-exercising_23-2151666664.jpg?w=740
const nextConfig: NextConfig = {
  /* config options here */
   images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.magnific.com',
        
      },
    ],
  },
};

export default nextConfig;
