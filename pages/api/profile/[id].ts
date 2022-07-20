import type { NextApiRequest, NextApiResponse } from 'next';
import {
	singleUserQuery,
	userCreatedPostsQuery,
	userLikedPostsQuery,
} from '../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const { id } = req.query;

		const query = singleUserQuery(id);
		const createPostQuery = userCreatedPostsQuery(id);
		const likedPostQuery = userLikedPostsQuery(id);

		const user = await client.fetch(query);
		const userCreatedPost = await client.fetch(createPostQuery);
		const userLikedPost = await client.fetch(likedPostQuery);

		res.status(200).json({ user: user[0], userCreatedPost, userLikedPost });
	}
}
