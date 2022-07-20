import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaCloud, FaCloudUploadAlt } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';
import { SanityAssetDocument } from '@sanity/client';

import useAuthStore from '../store/authStore';
import { client } from '../utils/client';

import { topics } from '../utils/constants';

const Upload = () => {
	const { userProfile }: { userProfile: any } = useAuthStore();
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [videoAsset, setVideoAsset] = useState<
		SanityAssetDocument | undefined
	>();
	const [wrongFileType, setWrongFileType] = useState(false);
	const [caption, setCaption] = useState('');
	const [topic, setTopic] = useState(topics[0].name);
	const [savingPost, setSavingPost] = useState(false);

	const uploadVideo = async (e: any) => {
		setIsLoading(true);
		const selectedFile = e.target.files[0];
		const fileTypes = ['video/mp4', 'video/webm', 'video/ogg'];
		if (fileTypes.includes(selectedFile.type)) {
			client.assets
				.upload('file', selectedFile, {
					contentType: selectedFile.type,
					filename: selectedFile.name,
				})
				.then(data => {
					setVideoAsset(data);
					setIsLoading(false);
				});
		} else {
			setIsLoading(false);
			setWrongFileType(true);
		}
	};

	const handlePost = async () => {
		if (caption && videoAsset?._id && topic) {
			setSavingPost(true);

			const document = {
				_type: 'post',
				caption,
				video: {
					_type: 'file',
					asset: {
						_type: 'reference',
						_ref: videoAsset?._id,
					},
				},
				userId: userProfile?._id,
				postedBy: {
					_type: 'postedBy',
					_ref: userProfile?._id,
				},
				topic,
				date: new Date(),
			};

			await axios.post(
				`${process.env.NEXT_PUBLIC_BASE_URL}/api/post`,
				document
			);
			router.push('/');
		}
	};

	return (
		<div className="flex w-full h-full absolute left-0 top-[60px] mb-10 pt-10 bg-[#fff] justify-center">
			<div className="bg-white rounded-lg xl:h-[80vh] flex gap-6 flex-wrap justify-center items-center p-14 pt-6 mb-20">
				<div>
					{/* header */}
					<div>
						<p className="text-2xl font-bold">Upload Video</p>
						<p className="text-md text-gray-400 mt-1">
							Post a video to your account
						</p>
					</div>
					{/* Video upload frame */}
					<div className="border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center items-center outline-none mt-10 w-[260px] h-[460px] p-10 cursor-pointer hover:border-red-300 hover:bg-gray-100">
						{isLoading ? (
							<p>Uploading...</p>
						) : (
							<div>
								{videoAsset ? (
									// upload video
									<div>
										<video
											src={videoAsset.url}
											loop
											controls
											className="rounded-xl h-[420px] bg-black"
										></video>
									</div>
								) : (
									// no video upload
									<label className="cursor-pointer">
										<div className="flex flex-col items-center justify-center h-full">
											<div className="flex flex-col items-center justify-center">
												<p className="font-bold text-xl">
													<FaCloudUploadAlt className="text-gray-300 text-6xl" />
												</p>
												<p className="text-xl font-semibold">Upload Video</p>
											</div>
											<p className="text-gray-400 text-center mt-10 text-sm leading-10">
												MP4 or WebM or ogg <br />
												720x1080 or higher <br />
												Up to 10 minutes <br />
												Less than 2GB
											</p>
											<p className="bg-[#f51997] text-center mt-10 rounded text-white text-md font-medium p-2 w-52 outline-none">
												Select File
											</p>
										</div>
										<input
											type="file"
											name="upload-video"
											className="w-0 h-0"
											onChange={uploadVideo}
										/>
									</label>
								)}
							</div>
						)}
						{wrongFileType && (
							<p className="text-center text-xl text-red-400 font-semibold mt-4 w-[250px]">
								Please select a video file
							</p>
						)}
					</div>
				</div>

				{/* Form */}
				<div className="flex flex-col gap-3 pb-10">
					{/* Caption */}
					<label className="text-md font-medium">Caption</label>
					<input
						type="text"
						value={caption}
						onChange={e => setCaption(e.target.value)}
						className="rounded text-md outline-none border-2 border-gray-200 p-2"
					/>
					{/* Select */}
					<label className="text-md font-medium">Choose a topic</label>
					<select
						className="capitalize rounded text-md outline-none border-2 border-gray-200 p-2"
						onChange={e => setTopic(e.target.value)}
					>
						{topics.map(item => (
							<option key={item.name} value={item.name}>
								{item.name}
							</option>
						))}
					</select>
					{/* Button */}
					<div className="flex gap-6 mt-10">
						<button
							onClick={() => {}}
							type="button"
							className="border-gray-200 border-2 text-md font-medium p-2 rounded w-28 lg:w-44 outline-none"
						>
							Discard
						</button>
						<button
							onClick={handlePost}
							type="button"
							className="text-md font-medium p-2 rounded w-28 lg:w-44 outline-none bg-[#f51997] text-white"
						>
							Post
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Upload;
