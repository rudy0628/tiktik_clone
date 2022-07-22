import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message';
import { IMessage } from '../../type';

interface IProps {
	name: string;
	messages: IMessage[];
}

const Messages = ({ name, messages }: IProps) => {
	return (
		<ScrollToBottom className="py-2 overflow-auto flex-auto">
			{messages.length ? (
				messages.map((message, i) => (
					<Message key={i} message={message} name={name} />
				))
			) : (
				<Message
					message={{ user: 'Bot', text: 'Please restart the chatroom' }}
					name="Bot"
				/>
			)}
		</ScrollToBottom>
	);
};

export default Messages;
