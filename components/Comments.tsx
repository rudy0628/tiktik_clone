import React, { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';

import useAuthStore from '../store/authStore';
import NoResult from './NoResult';
import { IUser } from '../type';

interface IProps {
	comment: string;
	isPostingComment: boolean;
	addComment: (e: React.FormEvent) => void;
	comments: IComment[];
	setComment: Dispatch<SetStateAction<string>>;
}

interface IComment {
	comment: string;
	length?: number;
	_key: string;
	postedBy: { _ref?: string; _id?: string };
}

const Comments = ({
	comment,
	setComment,
	addComment,
	comments,
	isPostingComment,
}: IProps) => {
	const { userProfile, allUsers } = useAuthStore();

	return (
		<div className="border-t-2 border-gray-200 pt-4 px-10 mt-2 bg-[#f8f8f8] border-b-2 lg:pb-0 pb-[180px]">
			{/* Comments */}
			<div className="overflow-scroll lg:h-[475px]">
				{comments?.length ? (
					comments.map((item, idx) => (
						<>
							{allUsers.map(
								(user: IUser) =>
									user._id === (item.postedBy._id || item.postedBy._ref) && (
										<div className="p-2 items-center" key={idx}>
											<Link href={`profile/${user._id}`}>
												<div className="flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded items-center">
													<div className="w-10 h-10">
														<Image
															src={user.image}
															width={45}
															height={45}
															className="rounded-full"
															alt="user profile"
															layout="responsive"
														/>
													</div>
													<div className="hidden xl:block">
														<p className="flex gap-1 items-center text-md font-bold text-primary">
															{user.userName}
															<GoVerified className="text-blue-400" />
														</p>
														<p>{item.comment}</p>
													</div>
												</div>
											</Link>
										</div>
									)
							)}
						</>
					))
				) : (
					<NoResult text="No comments yet!" />
				)}
			</div>
			{/* Send Comments */}
			{userProfile && (
				<div className="absolute bottom-0 left-0 pb-6 px-2 md:px-10">
					<form onSubmit={addComment} className="flex gap-4">
						<input
							type="text"
							value={comment}
							onChange={e => setComment(e.target.value)}
							placeholder="Add comment..."
							className="bg-primary px-6 py-4 text-md font-medium border-2 w-[250px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
						/>
						<button className="text-md text-gray-400" onClick={addComment}>
							{isPostingComment ? 'Commenting...' : 'Comment'}
						</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default Comments;
