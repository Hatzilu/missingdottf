/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'community.cloudflare.steamstatic.com',
				port: '',
				pathname: '/public/images/signinthroughsteam/sits_01.png',
			},
			{
				protocol: 'http',
				hostname: 'media.steampowered.com',
				port: '',
				pathname: '/apps/440/icons/**',
			},
		],
	},
};

export default nextConfig;
