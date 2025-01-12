import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
        remotePatterns: [{
            protocol: 'https',
            hostname: 'https://kh5jpk7oyenblzb0.public.blob.vercel-storage.com',
            port: ''
        }]
    }
}

export default nextConfig
