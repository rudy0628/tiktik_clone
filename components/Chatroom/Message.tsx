import React from 'react';

import { IMessage } from '../../type';

interface IProps {
	message: IMessage;
	name: string;
}

const Message = ({ message, name }: IProps) => {
	let isSendByCurrentUser = false;

	const trimmedName = name.trim().toLowerCase();

	if (message.user === trimmedName) {
		isSendByCurrentUser = true;
	}

	return isSendByCurrentUser ? (
		<div className="flex justify-end mt-3 px-5 items-center gap-3">
			<div className="rounded bg-[#F51997] text-white py-2 px-4">
				<p className="text-md">{message.text}</p>
			</div>
			<p className="text-sm text-gray-500">{message.user}</p>
		</div>
	) : (
		<div className="flex justify-start mt-3 px-5 items-center gap-3">
			<p className="text-sm text-gray-500">{message.user}</p>
			<div className="rounded bg-gray-200 text-black py-2 px-4">
				<p className="text-md">{message.text}</p>
			</div>
		</div>
	);
};

export default Message;
