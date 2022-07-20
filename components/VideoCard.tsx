import React, { useState, useEffect, useRef } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

import { Video } from '../type';

interface IProps {
	post: Video;
}

const VideoCard: NextPage<IProps> = ({ post }) => {
	const [isHover, setIsHover] = useState(false);
	const [playing, setPlaying] = useState(false);
	const [isVideoMuted, setIsVideoMuted] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	const onVideoPres = () => {
		if (playing) {
			videoRef?.current?.pause();
			setPlaying(false);
		} else {
			videoRef?.current?.play();
			setPlaying(true);
		}
	};

	const onVideoMuted = () => {
		if (isVideoMuted) {
			videoRef.current!.muted = false;
			setIsVideoMuted(false);
		} else {
			videoRef.current!.muted = true;
			setIsVideoMuted(true);
		}
	};

	return (
		<div className="flex flex-col border-b-2 border-gray-200 pb-6">
			{/* Header */}
			<div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
				<div className="md:w-16 md:h-16 w-10 h-10">
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
						<div className="flex items-center gap-2">
							<p className="flex items-center gap-2 md:text-md font-bold text-primary">
								{post.postedBy.userName}{' '}
								<GoVerified className="text-blue-400 text-md" />
							</p>
							<p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
								{post.postedBy.userName}
							</p>
						</div>
					</Link>
					<p className="mt-2 font-normal">{post.caption}</p>
				</div>
			</div>
			{/* Video */}
			<div className="lg:ml-20 flex gap-4 relative">
				<div
					className="rounded-3xl"
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
				>
					<Link href={`/detail/${post._id}`}>
						<video
							className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
							src={post.video.asset.url}
							ref={videoRef}
							controls
						></video>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default VideoCard;
