import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	typescript: {
		ignoreBuildErrors: true
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'image.tmdb.org'
			}
		]
	}
	/* config options here */
};

export default nextConfig;
