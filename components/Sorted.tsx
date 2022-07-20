import React, { useState } from 'react';

import { BsArrowUp, BsArrowDown } from 'react-icons/bs';
import usePostStore from '../store/postStore';

const Sorted = () => {
	const { isDesc, setIsDesc } = usePostStore();

	return (
		<div className="xl:border-b-2 border-gray-200 pb-4">
			<p className="text-gray-500 font-semibold m-3 mt-4 hidden xl:block">
				Sorted
			</p>
			<div className="flex justify-center xl:justify-start">
				<button
					className="xl:ml-3 flex gap-3 items-center border-2 border-gray-300 px-2 py-1 rounded"
					onClick={setIsDesc}
				>
					<span className="hidden xl:block">Date</span>
					{isDesc ? <BsArrowDown /> : <BsArrowUp />}
				</button>
			</div>
		</div>
	);
};

export default Sorted;
