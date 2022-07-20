import React, { useState } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

import VideoCard from '../../components/VideoCard';
import NoResult from '../../components/NoResult';
import { IUser, Video } from '../../type';
import useAuthStore from '../../store/authStore';

const Search = ({ videos }: { videos: Video[] }) => {
	const [isAccounts, setIsAccounts] = useState(false);
	const router = useRouter();
	const { searchTerm }: any = router.query;
	const { allUsers } = useAuthStore();

	const accounts = isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
	const isVideos = !isAccounts ? 'border-b-2 border-black' : 'text-gray-400';
	const searchedAccounts = allUsers.filter((user: IUser) =>
		user.userName.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="w-full">
			<div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
				<p
					className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
					onClick={() => setIsAccounts(true)}
				>
					Accounts
				</p>
				<p
					className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
					onClick={() => setIsAccounts(false)}
				>
					Videos
				</p>
			</div>
			{isAccounts ? (
				<div className="md:mt-10">
					{searchedAccounts.length > 0 ? (
						searchedAccounts.map((account: IUser, idx: number) => (
							<Link href={`/profile/${account._id}`} key={idx}>
								<div className="flex gap-3 p-3 cursor-pointer font-semibold rounded items-center hover:bg-gray-100">
									<div className="ml-4 md:w-16 md:h-16 w-10 h-10">
										<Image
											width={62}
											height={62}
											className="rounded-full"
											src={account.image}
											alt="profile"
											layout="responsive"
										/>
									</div>
									<div>
										<div className="flex flex-col gap-2">
											<p className="flex items-center gap-2 md:text-md font-bold text-primary">
												{account.userName}{' '}
												<GoVerified className="text-blue-400 text-md" />
											</p>
											<p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
												{account.userName}
											</p>
										</div>
									</div>
								</div>
							</Link>
						))
					) : (
						<NoResult text={`No account result for ${searchTerm}`} />
					)}
				</div>
			) : (
				<div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
					{videos.length ? (
						videos.map((video: Video, idx: number) => (
							<VideoCard post={video} key={idx} />
						))
					) : (
						<NoResult text={`No video result for ${searchTerm}`} />
					)}
				</div>
			)}
		</div>
	);
};

export const getServerSideProps = async ({
	params: { searchTerm },
}: {
	params: { searchTerm: string };
}) => {
	const res = await axios.get(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/search/${searchTerm}`
	);

	return {
		props: { videos: res.data },
	};
};

export default Search;
