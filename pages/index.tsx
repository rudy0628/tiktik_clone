import type { NextPage } from 'next';
import axios from 'axios';
import { Video } from '../type';

import VideoCard from '../components/VideoCard';
import NoResult from '../components/NoResult';

interface IProps {
	videos: Video[];
}

const Home: NextPage<IProps> = ({ videos }) => {
	return (
		<div className="flex flex-col gap-10 videos h-full">
			{videos.length ? (
				videos.map((video: Video) => <VideoCard post={video} key={video._id} />)
			) : (
				<NoResult text={'No Videos'} />
			)}
		</div>
	);
};

export const getServerSideProps = async ({
	query: { topic },
}: {
	query: { topic: string };
}) => {
	let response = null;
	if (topic) {
		response = await axios.get(
			`${process.env.NEXT_PUBLIC_BASE_URL}/api/discover/${topic}`
		);
	} else {
		response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`);
	}

	return {
		props: {
			videos: response.data,
		},
	};
};

export default Home;
