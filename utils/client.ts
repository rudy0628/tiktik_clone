import sanityClient from '@sanity/client';

export const client = sanityClient({
	projectId: 'p721goxa',
	dataset: 'production',
	apiVersion: '2022-07-14',
	useCdn: false,
	token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
