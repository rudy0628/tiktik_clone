import React, { KeyboardEvent } from 'react';

interface IProps {
	message: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
	sendMessage: (event: any) => void;
}

const Input = ({ message, setMessage, sendMessage }: IProps) => {
	return (
		<form className="border-t-2 border-gray-200 flex">
			<input
				type="text"
				value={message}
				placeholder="Type a message..."
				onChange={event => setMessage(event.target.value)}
				onKeyPress={(event: any) =>
					event.key === 'Enter' ? sendMessage(event) : null
				}
				className="py-2 px-4 border-none outline-none w-full"
			/>
			<button
				className="py-2 px-4 bg-[#F51997] text-white"
				onClick={event => sendMessage(event)}
			>
				Send
			</button>
		</form>
	);
};

export default Input;
