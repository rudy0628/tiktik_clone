import React, { useState, useRef, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { GoVerified } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import { HiOutlineStatusOnline } from 'react-icons/hi';
import axios from 'axios';
import { Video } from '../../type';
import useAuthStore from '../../store/authStore';
import usePostStore from '../../store/postStore';

import Chatroom from '../../components/Chatroom/Chatroom';
import LikeButton from '../../components/LikeButton';
import Comments from '../../components/Comments';

interface IProps {
	postDetails: Video;
}

const Detail = ({ postDetails }: IProps) => {
	const [post, setPost] = useState(postDetails);
	const [comment, setComment] = useState('');
	const [isPostingComment, setIsPostingComment] = useState(false);

	const videoRef = useRef<HTMLVideoElement>(null);
	const router = useRouter();
	const { userProfile }: any = useAuthStore();
	const { chatroomIsOpen, setChatroomIsOpen }: any = usePostStore();
	const chatroomName = String(userProfile.email).replace('@gmail.com', '');
	const chatroomId: any = router.query.id;

	const handleLike = async (like: boolean) => {
		if (userProfile) {
			const { data } = await axios.put(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/like`,
				{ userId: userProfile._id, postId: post._id, like }
			);
			setPost({ ...post, likes: data.likes });
		}
	};

	const addComment = async (e: FormEvent) => {
		e.preventDefault();

		if (userProfile && comment) {
			setIsPostingComment(true);

			const { data } = await axios.put(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${post._id}`,
				{
					userId: userProfile._id,
					comment,
				}
			);

			setPost({ ...post, comments: data.comments });
			setComment('');
			setIsPostingComment(false);
		}
	};

	if (!postDetails) return null;

	return (
		<div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
			{/* Chatroom */}
			{chatroomIsOpen && <Chatroom name={chatroomName} room={chatroomId} />}
			{/* Video container */}
			<div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
				<div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
					<p className="cursor-pointer" onClick={() => router.back()}>
						<MdOutlineCancel className="text-white text-[35px]" />
					</p>
				</div>
				<div className="relative">
					{/* video */}
					<div className="lg:h-[100vh] h-[60vh]">
						<video
							src={post.video.asset.url}
							className="h-full cursor-pointer"
							ref={videoRef}
							loop
							controls
						></video>
					</div>
				</div>
			</div>
			{/* Comment */}
			<div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
				<div className="lg:mt-20 mt-10">
					{/* header */}
					<div className="flex gap-3 p-2 cursor-pointer font-semibold rounded items-center">
						<div className="ml-4 md:w-16 md:h-16 w-10 h-10">
							<Link href={`/profile/${post.postedBy._id}`}>
								<>
									<Image
										width={62}
										height={62}
										className="rounded-full"
										src={post.postedBy.image}
										alt="profile"
										layout="responsive"
									/>
								</>
							</Link>
						</div>
						<div>
							<Link href={`/profile/${post.postedBy._id}`}>
								<div className="flex flex-col gap-2">
									<p className="flex items-center gap-2 md:text-md font-bold text-primary">
										{post.postedBy.userName}{' '}
										<GoVerified className="text-blue-400 text-md" />
									</p>
									<p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
										{post.postedBy.userName}
									</p>
								</div>
							</Link>
						</div>
					</div>
					{/* Caption */}
					<p className="px-8 text-lg text-gray-600 mt-5">{post.caption}</p>
					{/* like button */}
					<div className="mt-10 px-10 flex gap-4 items-center">
						{userProfile && (
							<LikeButton
								likes={post.likes}
								handleLike={() => handleLike(true)}
								handleDislike={() => handleLike(false)}
							/>
						)}
						{userProfile && (
							<button
								className="p-2 w-10 h-10 rounded-full bg-[#f51997] flex justify-center items-center"
								onClick={() => setChatroomIsOpen(true)}
							>
								<HiOutlineStatusOnline className="text-white" />
							</button>
						)}
					</div>
					{/* Comment */}
					<Comments
						comment={comment}
						setComment={setComment}
						addComment={addComment}
						comments={post.comments}
						isPostingComment={isPostingComment}
					/>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps = async ({
	params: { id },
}: {
	params: { id: string };
}) => {
	const { data } = await axios.get(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`
	);

	return {
		props: { postDetails: data },
	};
};

export default Detail;
